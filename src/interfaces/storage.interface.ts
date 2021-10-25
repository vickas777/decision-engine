export interface Storage {
  getModifierByRegCode(regCode: string): number | null
}
