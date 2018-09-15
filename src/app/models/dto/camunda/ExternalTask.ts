import Variable from './Variable';

export class ExternalTask {
    ActivityId: string;
    ActivityInstanceId: string;
    ProcessInstanceId: string;
    ProcessDefinitionId: string;
    Id: string;
    Retries: number | null;
    Variables: { [key: string]: Variable };
    TopicName: string;
    WorkerId: string;
    Priority: number | null;
}
