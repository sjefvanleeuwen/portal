export class BPMProcess {
    public Id: string;
    public ProcessDefinitionId: string;
    public Priority: number;
    public Created: Date;
    public ExecitionId: string;
    public TaskDefinitionKey: string;
    public CaseExecutionId: string;
    public CaseDefinitionId: string;
    public FormKey: string;
    public Name: string;
    public Assignee: string;
    public Due: Date;
    public FollowUp: string;
    public DelegationState: number;
    public Description: string;
    public Owner: string;
    public ParentTaskId: string;
    public CaseInstanceId: string;
    public TenantId: string;
}

export class BPMProcessData {
    public Id: string;
    public ProcessDefinitionId: string;
    public Priority: number;
    public ActivityId: string;
    public ActivityInstanceId: string;
    public ProcessInstanceId: string;
    public Retries: number;
    public Variables: any;
    public TopicName: string;
    public WorkerId: string;
}
