import {DeploymentInstance} from "./deployment-instance.model";
import {Environment} from "./environment.model";

export class Deployable {

    constructor(
        public readonly name: string,
        public readonly instances: Map<string, DeploymentInstance[]>,
    ) {
    }

    getInstances(environment: Environment): DeploymentInstance[] {
        return this.instances.get(environment.name) || [];
    }
}