import {Injectable} from "@angular/core";
import {Deployable} from "../model/deployable.model";
import {Environment} from "../model/environment.model";
import {DeployableDiff} from "../model/deployable-diff.model";
import {DeploymentInstanceDiff} from '../model/deployment-instance-diff.model';
import {DeploymentInstance} from "../model/deployment-instance.model";

const COLOR_LETTERS = '0123456789ABCDEF';

@Injectable({
    providedIn: 'root',
})
export class DeployableComparatorService {

    constructor() {
    }

    compare(deployables: Deployable[], environments: Environment[]): DeployableDiff[] {
        return deployables.map(deployable => this._compareDeployable(deployable, environments));
    }

    private _compareDeployable(deployable: Deployable, environments: Environment[]): DeployableDiff {
        let differences = this._compareInstances(environments, deployable);

        return new DeployableDiff(
            deployable,
            differences.hasDifferences,
            differences.differences
        );
    }

    private _compareInstances(environments: Environment[], deployable: Deployable): {
        hasDifferences: boolean,
        differences: Map<string, DeploymentInstanceDiff[]>
    } {
        let colorsByVersion: Map<string, string> = new Map();

        let differences = new Map(
            environments.map(env => [
                env.name,
                deployable.getInstances(env).map(instance => this._compareInstance(instance, colorsByVersion))
            ])
        );

        return {
            hasDifferences: colorsByVersion.size > 1,
            differences: differences
        };
    }

    private _compareInstance(instance: DeploymentInstance, colorsByVersion: Map<string, string>) {
        return new DeploymentInstanceDiff(instance, this._generateColor(instance.version, colorsByVersion));
    }

    private _generateColor(version: string, colorsByVersion: Map<string, string>): string {
        let color = colorsByVersion.get(version);
        if (!!color) {
            return color;
        }

        do {
            color = this._getRandomColor();
        } while (this._hasColor(colorsByVersion, color));

        colorsByVersion.set(version, color);

        return color;
    }

    private _getRandomColor() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += COLOR_LETTERS[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    private _hasColor(colorsByVersion: Map<string, string>, generatedColor: string): boolean {
        for (const existingColor of colorsByVersion.values()) {
            if (existingColor === generatedColor) {
                return true;
            }
        }

        return false;
    }
}