import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { Production } from "src/app/model/units/production";
import { ONE } from "src/app/model/CONSTANTS";
import { Unit } from "src/app/model/units/unit";
import { BaseComponentComponent } from "src/app/base-component/base-component.component";

@Component({
  selector: "app-sub-table",
  templateUrl: "./sub-table.component.html",
  styleUrls: ["./sub-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubTableComponent extends BaseComponentComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: Production;
  @Input() unit: Unit;
  subData: Array<{
    what: string;
    quantity: Decimal;
    effect: Decimal;
    total: Decimal;
  }>;
  ngOnInit() {
    this.subData = this.getSubData(this.data);
  }
  getIndex(index: number, a: any) {
    return index;
  }
  getSubData(
    prod: Production
  ): Array<{
    what: string;
    quantity: Decimal;
    effect: Decimal;
    total: Decimal;
  }> {
    let ret = new Array<{
      what: string;
      quantity: Decimal;
      effect: Decimal;
      total: Decimal;
    }>();

    // ret.push({
    //   what: "Base",
    //   quantity: this.data.ratio,
    //   effect: new Decimal(this.unit.operativity),
    //   total: new Decimal(this.unit.operativity).times(this.data.ratio)
    // });

    ret = ret.concat(
      prod.product.prodBy.bonuses
        .concat(prod.producer.prodAllBonus.bonuses)
        .concat(
          this.data.ratio.gt(0) ? prod.producer.prodEfficiency.bonuses : []
        )
        .map((bonus) => {
          return {
            what: bonus.unit.name,
            quantity: bonus.unit.quantity,
            effect: bonus.multiplier.times(100),
            total: bonus.multiplier
              .times(bonus.unit.quantity)
              .times(100)
              .plus(100)
          };
        })
    );

    return ret;
  }
}
