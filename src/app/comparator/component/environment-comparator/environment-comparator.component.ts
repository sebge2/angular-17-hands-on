import {Component, computed, inject, signal} from '@angular/core';
import {
    MultiSelectDropdownComponent
} from "@comparator-shared";
import {EnvironmentService} from "../../service/environment.service";
import {DeployableService} from "../../service/deployable.service";
import {Environment} from "../../model/environment.model";
import {
    EnvironmentComparatorTableComponent
} from "./environment-comparator-table/environment-comparator-table.component";
import {DeployableComparatorService} from "../../service/deployable-comparator.service";

const COMPONENTS = [
    MultiSelectDropdownComponent,
    EnvironmentComparatorTableComponent,
];

@Component({
    selector: 'app-environment-comparator',
    standalone: true,
    imports: [COMPONENTS],
    templateUrl: './environment-comparator.component.html',
    styleUrl: './environment-comparator.component.scss'
})
export class EnvironmentComparatorComponent {

    readonly environmentService = inject(EnvironmentService);
    readonly #deployableService = inject(DeployableService);
    readonly #comparator = inject(DeployableComparatorService);

    readonly selectedEnvironments = signal<Environment[]>([]);

    readonly deployableDifferences = computed(() =>
        this.#comparator.compare(this.#deployableService.deployables(), this.selectedEnvironments())
    );

    onSelectedEnvironments(environments: Environment[]): void {
        this.selectedEnvironments.set(environments);
    }

    toLabel(env: Environment): string {
        return env.name;
    }
}
