import {DeploymentInstance} from "./deployment-instance.model";

export class DeploymentInstanceDiff {

    constructor(
        public readonly instance: DeploymentInstance,
        public readonly color: string,
    ) {
    }
}