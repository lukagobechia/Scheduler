export interface Schedule {
    id: number;
    startTime: Date;
    endTime: Date;
    userId: number;
    jobId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    isApproved: boolean;
  }
  