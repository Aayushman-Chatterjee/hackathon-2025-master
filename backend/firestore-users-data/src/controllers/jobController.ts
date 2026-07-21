import { Request, Response } from 'express';
import { pollJobResultsService, updateJobResultsService } from '../services/jobService';
import { jobSchema } from '../schema';

/*@ts-ignore*/
export const pollJobResults = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    console.info(`[jobController.pollJobResults.jobId]:`, jobId);

    if (!jobId) {
      console.warn(`[jobController.pollJobResults]: Missing jobId`);
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const userData = await pollJobResultsService(jobId);
    console.info(`[jobController.pollJobResults.response]:`, userData);

    res.status(200).json(userData);
  } catch (error: any) {
    console.error(`[jobController.pollJobResults.error]:`, error);
    res.status(500).json({ message: 'Error fetching job data', error: error.message });
  }
};

/*@ts-ignore*/
export const updateJobResults = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    console.info(`[jobController.updateJobResults.jobId]:`, jobId);
    console.info(`[jobController.updateJobResults.payload]:`, req.body);

    if (!jobId) {
      console.warn(`[jobController.updateJobResults]: Missing jobId`);
      return res.status(400).json({ message: 'Job ID is required' });
    }

    // Validate request body against Joi schema
    const { error } = jobSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.warn(`[updateJobResults] Validation failed for jobId: ${jobId}`, error.details);
      return res.status(400).json({
        message: 'Invalid data',
        errors: error.details.map(err => err.message),
      });
    }

    const userData = await updateJobResultsService(jobId, req.body);
    console.info(`[jobController.updateJobResults.response]:`, userData);

    res.status(200).json(userData);
  } catch (error: any) {
    console.error(`[jobController.updateJobResults.error]:`, error);
    res.status(500).json({ message: 'Error fetching job data', error: error.message });
  }
};
