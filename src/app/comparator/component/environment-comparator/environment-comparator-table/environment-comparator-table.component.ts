import {Component, computed, input, Signal} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {Environment} from "../../../model/environment.model";
import {DeployableDiff} from "../../../model/deployable-diff.model";
import {DeploymentInstanceDiff} from "../../../model/deployment-instance-diff.model";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

const COMPONENTS = [
    CommonModule,
    MatTableModule,
    MatIcon,
];

@Component({
    selector: 'app-environment-comparator-table',
    standalone: true,
    imports: [COMPONENTS],
    templateUrl: './environment-comparator-table.component.html',
    styleUrl: './environment-comparator-table.component.scss'
})
export class EnvironmentComparatorTableComponent {

    deployables = input<DeployableDiff[]>([]);
    environments = input<Environment[]>([]);

    readonly numberDeployables: Signal<number> = computed(
        () => this.deployables().length
    );

    readonly displayedColumns: Signal<string[]> = computed(
        () => ['deployableName', ...this.environments().map(env => env.name)]
    );

    constructor() {
    }

    getDeployableInstances(deployable: any, env: Environment): DeploymentInstanceDiff[] {
        // TODO improve this
        return (deployable as DeployableDiff).getInstances(env);
    }
}
