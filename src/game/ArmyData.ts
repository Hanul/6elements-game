export enum ArmyKind { Light, Fire, Water, Wind, Earth, Dark }

export default interface ArmyData {
    kind: ArmyKind;
    unitCount: number;
    owner: string;
}