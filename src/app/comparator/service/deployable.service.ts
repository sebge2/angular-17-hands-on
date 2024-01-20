import {Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {Deployable} from "../model/deployable.model";
import {DeploymentInstance} from "../model/deployment-instance.model";

@Injectable({
    providedIn: 'root'
})
export class DeployableService {

    public readonly deployables: Signal<Deployable[]>;

    private readonly _deployables: WritableSignal<Deployable[]> = signal([]);

    constructor() {
        this.deployables = this._deployables.asReadonly();

        this._deployables.set([
            new Deployable(
                'user-service',
                new Map([
                    ['Dev', [new DeploymentInstance('user-service', '1.0.0')]],
                    ['Test', [new DeploymentInstance('user-service', '1.0.0')]],
                    ['Hom', [new DeploymentInstance('user-service', '1.0.0')]],
                    ['Prod', [new DeploymentInstance('user-service', '1.0.0')]],
                ])
            ),
            new Deployable(
                'product-service',
                new Map([
                    ['Dev', [new DeploymentInstance('product-service', '2.0.0-SNAPSHOT')]],
                    ['Test', [new DeploymentInstance('product-service', '1.0.0')]],
                    ['Hom', [new DeploymentInstance('product-service', '1.0.0')]],
                    ['Prod', [new DeploymentInstance('product-service', '1.0.0')]],
                ])
            ),
        ]);
    }
}