import { IResearchData, IJobType } from "../data/iResearchData";
import { Job, MyIcon } from "../job/job";
import { convertToRoman, solveEquation } from "ant-utils";
import { RESEARCH_GROW_RATE, ZERO, ONE } from "../CONSTANTS";
import { IUnlocable } from "../iUnlocable";
import { Game } from "../game";
import { IBase } from "../iBase";

export class Research extends Job implements IUnlocable, IBase {
  id: string;
  private originalName: string;
  max = Number.MAX_SAFE_INTEGER;
  unitsToUnlock?: IUnlocable[];
  researchToUnlock?: IUnlocable[];

  quantity: Decimal;
  icon?: string;

  constructor(researchData: IResearchData) {
    super();
    this.id = researchData.id;
    this.name = researchData.name;
    this.originalName = this.name;
    this.description = researchData.description;
    this.initialPrice = new Decimal(researchData.price);
    if ("max" in researchData) {
      this.max = researchData.max;
    }
    this.growRate = RESEARCH_GROW_RATE;
    if ("growRate" in researchData) {
      this.growRate = researchData.growRate;
    }
    if ("unitsToUnlock" in researchData) {
      this.unitsToUnlock = researchData.unitsToUnlock.map(uId =>
        Game.getGame().resouceManager.units.find(a => a.id === uId)
      );
    }
    this.types = researchData.type;
    this.reload();
  }

  reload(): void {
    super.reload();
    this.name =
      this.originalName +
      (this.level > 1
        ? " " + convertToRoman(Decimal.min(this.level, this.max))
        : "");
    this.quantity = new Decimal(this.level);
  }

  reloadUi() {
    super.reloadUi();
    const newTotalBonUi = this.totalBonus.minus(1).times(100);
    if (!newTotalBonUi.eq(this.totalBonusUi)) this.totalBonusUi = newTotalBonUi;

    const science = Game.getGame().resouceManager.science;
    this.timeToEnd = solveEquation(
      ZERO,
      science.perSec2,
      science.perSec,
      this.total
        .minus(this.progress)
        .times(-1)
        .div(this.totalBonus.minus(1))
    )
      .reduce((p, c) => p.min(c), new Decimal(Number.MAX_VALUE))
      .toNumber();
  }

  onCompleted(): void {
    super.onCompleted();

    if (this.level < 2) {
      if (this.unitsToUnlock) {
        this.unitsToUnlock.forEach(u => u.unlock());
        Game.getGame().resouceManager.reloadLists();
      }
      if (this.researchToUnlock) {
        this.researchToUnlock.forEach(u => u.unlock());
      }
    }
  }

  unlock(): boolean {
    const resM = Game.getGame().researchManager;
    return resM.unlock(this);
  }

  getIcons(): MyIcon[] {
    return this.types.map(t => {
      return {
        icon: t.icon,
        color: t.color
      };
    });
  }

  //#region Save and Load
  getSave(): any {
    const ret: any = {};
    ret.i = this.id;
    if (this.progress.gt(0)) {
      ret.p = this.progress;
    }
    if (this.level > 0) {
      ret.l = this.level;
    }
    return ret;
  }
  load(data: any) {
    if (!("i" in data) || data.i !== this.id) return false;
    if ("p" in data) this.progress = new Decimal(data.p);
    if ("l" in data) this.level = data.l;
    this.reload();
  }
  //#endregion
}