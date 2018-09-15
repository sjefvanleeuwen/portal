export default class HumanTask {
    Id: string;
    Name: string;
    Assignee: string;
    Owner: string;
    Created: Date | string | null;
    Due: Date | string | null;
    FollowUp: Date | string | null;
    Description: string;
    Priority: string;
    FormKey: string;
    ProcessInstanceId: string;
    ProcessDefinitionId: string;
    TaskDefinitionKey: string;
    // more attributes see https://docs.camunda.org/manual/latest/reference/rest/task/get-query/
}
