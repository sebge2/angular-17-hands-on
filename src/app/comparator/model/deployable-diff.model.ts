import {Deployable} from "./deployable.model";
import {DeploymentInstanceDiff} from "./deployment-instance-diff.model";
import {Environment} from "./environment.model";

export class DeployableDiff {

    constructor(
        public readonly deployable: Deployable,
        public readonly hasDifferences: boolean,
        public readonly instances: Map<string, DeploymentInstanceDiff[]>,
    ) {
    }

    getInstances(environment: Environment): DeploymentInstanceDiff[] {
        return this.instances.get(environment.name) || [];
    }
}