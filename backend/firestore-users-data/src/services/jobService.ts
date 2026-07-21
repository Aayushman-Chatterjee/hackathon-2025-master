import { db } from '../config/firebase';

export const pollJobResultsService = async (jobId: string) => {
  try {
    console.info(`[jobService.pollJobResultsService] Checking job status for jobId: ${jobId}`);

    const jobRef = db.collection('jobs').doc(jobId);
    const jobSnap = await jobRef.get();

    if (!jobSnap.exists) {
      console.warn(`[jobService.pollJobResultsService] No job found for jobId: ${jobId}`);
      return { status: 'not found', ready: false };
    }

    const job = jobSnap.data();
    console.info(`[jobService.pollJobResultsService] Job for jobId ${jobId}:`, job);

    return {
      status: job?.status ?? 'not ready',
      ready: job?.status && job.status !== 'processing',
    };
  } catch (error) {
    console.error(`🔥 [jobService.pollJobResultsService] Error fetching job data for jobId: ${jobId}`, error);
    throw new Error('Failed to retrieve job data.');
  }
};

export const updateJobResultsService = async (jobId: string, payload: any) => {
  try {
    console.info(`[jobService.updateJobResultsService] Updating jobId: ${jobId} with payload:`, payload);

    const jobRef = db.collection('jobs').doc(jobId);

    await db.runTransaction(async transaction => {
      const jobSnap = await transaction.get(jobRef);
      if (!jobSnap.exists) {
        console.warn(`[jobService.updateJobResultsService] No job found for jobId: ${jobId}, creating new entry.`);
        transaction.set(jobRef, payload);
      } else {
        console.info(`[jobService.updateJobResultsService] Updating existing jobId: ${jobId}`);
        transaction.update(jobRef, payload);
      }
    });

    console.info(`[jobService.updateJobResultsService] Successfully updated jobId: ${jobId}`);
    return { success: true, message: `Job ID ${jobId} updated successfully` };
  } catch (error) {
    console.error(`🔥 [jobService.updateJobResultsService] Error updating job data for jobId: ${jobId}`, error);
    throw new Error('Failed to update job data.');
  }
};
