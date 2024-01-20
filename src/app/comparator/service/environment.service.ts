import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Environment} from "../model/environment.model";

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    public readonly environments: Signal<Environment[]>;

    private readonly _environments: WritableSignal<Environment[]> = signal([]);

    constructor() {
        this.environments = this._environments.asReadonly();

        this._environments.set(
           [
               new Environment('Dev'),
               new Environment('Test'),
               new Environment('Hom'),
               new Environment('Prod'),
           ]
        )
    }
}