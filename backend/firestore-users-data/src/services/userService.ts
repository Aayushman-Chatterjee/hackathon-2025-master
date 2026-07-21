import { db } from '../config/firebase';
import { getDataFromGCS } from '../config/gcs';
import { updateJobResultsService } from './jobService';
import { sendUserDataToLLMService } from './llmService';

// Function to fetch user data
export const getUserData = async (userId: string) => {
  try {
    console.info(`[userService.getUserData.userId]: ${userId}`);

    const snapshot = db.collection('users');
    const userRef = snapshot.doc(userId);

    console.info(`[userService.getUserData.userRef]: ${userRef?.path}`);

    // Fetch basic_info and profile_score
    const basicInfoSnap = await userRef.collection('basic_info').doc('basic_info').get();
    const profileScoreSnap = await userRef.collection('profile_score').doc('profile_score').get();

    const basic_info = basicInfoSnap.exists ? basicInfoSnap.data() : null;
    const profile_score = profileScoreSnap.exists ? profileScoreSnap.data() : null;

    // Fetch subcollections (assets, liabilities, spending_data)
    const assetsSnap = await userRef.collection('assets').get();
    const liabilitiesSnap = await userRef.collection('liabilities').get();
    const transactionsSnap = await userRef.collection('transactions').get();
    const goalsSnap = await userRef.collection('goals').get();
    const investmentsSnap = await userRef.collection('investments').get();
    const insurancesSnap = await userRef.collection('insurances').get();

    const assets = assetsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    const liabilities = liabilitiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    const transactions = transactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    const goals = goalsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    const investments = investmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    const insurances = insurancesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

    const recommendations = JSON.parse(
      (await getDataFromGCS({
        bucketName: 'llm-profile-response',
        folderName: 'results/users',
        fileName: `${userId}.json`,
      })) || '{}',
    );

    console.info(`[userService.getUserData.recommendations]:`, recommendations);

    return { basic_info, profile_score, assets, liabilities, transactions, goals, investments, insurances, recommendations };
  } catch (error) {
    console.error(`[userService.getUserData.error]:`, error);
    throw new Error('Failed to retrieve user data.');
  }
};

export const saveUserData = async (
  userId: string,
  payload: {
    basic_info?: any;
    profile_score?: any;
    assets?: any[];
    liabilities?: any[];
    transactions?: any[];
    investments?: any[];
    goals?: any[];
    insurances?: any[];
    use_llm?: boolean;
  },
) => {
  try {
    console.info(`[userService.saveUserData.userId]: ${userId}`);
    console.info(`[userService.saveUserData.payload]:`, payload);

    const userRef = db.collection('users').doc(userId);
    console.info(`[userService.saveUserData.userRef]: ${userRef?.path}`);

    const updatedSections: string[] = [];
    const LLMPayload: any = { user_id: userId, data: {} };

    // Save basic_info and profile_score
    if (payload.basic_info) {
      await userRef.collection('basic_info').doc('basic_info').set(payload.basic_info);
      updatedSections.push('basic_info');
      LLMPayload['data']['basic_info'] = payload.basic_info;
    }
    if (payload.profile_score) {
      await userRef.collection('profile_score').doc('profile_score').set(payload.profile_score);
      updatedSections.push('profile_score');
      LLMPayload['data']['profile_score'] = payload.profile_score;
    }
    const saveSubcollection = async (collectionName: string, data: any[]) => {
      console.info(`[userService.saveUserData.${collectionName}]:`, data);
      const collectionRef = userRef.collection(collectionName);
      const batch = db.batch();
      data.forEach(item => {
        const docRef = collectionRef.doc(item.id || db.collection(collectionName).doc().id);
        batch.set(docRef, item);
      });
      await batch.commit();
      updatedSections.push(collectionName);
      LLMPayload['data'][collectionName] = data.reduce((acc, transaction) => {
        const { id, ...rest } = transaction;
        acc[id] = rest;
        return acc;
      }, {});
    };

    // Fetch recommendations
    if (payload.assets && payload.assets.length) {
      await saveSubcollection('assets', payload.assets);
    }
    if (payload.liabilities && payload.liabilities.length) {
      await saveSubcollection('liabilities', payload.liabilities);
    }
    if (payload.transactions && payload.transactions.length) {
      await saveSubcollection('transactions', payload.transactions);
    }
    if (payload.investments && payload.investments.length) {
      await saveSubcollection('investments', payload.investments);
    }
    if (payload.goals && payload.goals.length) {
      await saveSubcollection('goals', payload.goals);
    }
    if (payload.insurances && payload.insurances.length) {
      await saveSubcollection('insurances', payload.insurances);
    }

    if (payload?.use_llm) {
      console.info(`[userService.saveUserData.use_llm]: true`);
      console.info(`[userService.saveUserData.LLMPayload]:`, LLMPayload);

      const jobData = await sendUserDataToLLMService(LLMPayload);
      console.info(`[userService.saveUserData.jobData]:`, jobData);

      await updateJobResultsService(userId, {
        status: jobData?.status ?? '',
        progress: jobData?.progress ?? '',
        result_path: jobData?.result_path ?? '',
      });
    }

    console.info(`[userService.saveUserData.updatedSections]:`, updatedSections);
    return { success: true, updatedSections };
  } catch (error) {
    console.error(`[userService.saveUserData.error]:`, error);
    throw new Error('Failed to save user data.');
  }
};
