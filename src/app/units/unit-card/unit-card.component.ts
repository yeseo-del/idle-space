import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { MainService } from "src/app/main.service";
import { Unit } from "src/app/model/units/unit";
import { ONE } from "src/app/model/CONSTANTS";
import { Production } from "src/app/model/units/production";
import { Price } from "src/app/model/prices/price";

@Component({
  selector: "app-unit-card",
  templateUrl: "./unit-card.component.html",
  styleUrls: ["./unit-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitCardComponent implements OnInit, OnDestroy {
  @Input() unit: Unit;
  actions = [];
  private subscriptions: Subscription[] = [];
  sliderDisabled = false;
  index1 = 0;

  @ViewChild("buyOne", null)
  private buyOne: TemplateRef<any>;
  @ViewChild("buyHalf", null)
  private buyHalf: TemplateRef<any>;
  @ViewChild("buyMax", null)
  private buyMax: TemplateRef<any>;
  @ViewChild("buyNone", null)
  private buyNone: TemplateRef<any>;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sliderDisabled = !this.unit.production.find(p => p.ratio.lt(0));
    this.getActions();
    this.subscriptions.push(
      this.ms.updateEmitter.subscribe(() => {
        this.getActions();
        this.cd.markForCheck();
      })
    );
  }

  getActions() {
    this.unit.buyPrice.reload(this.unit.manualBought);
    const newActions = [];

    if (this.unit.buyPrice.canBuy) {
      newActions.push(this.buyOne);
      if (this.unit.buyPrice.maxBuy.gte(4)) {
        newActions.push(this.buyHalf);
      }
      if (this.unit.buyPrice.maxBuy.gte(2)) {
        newActions.push(this.buyMax);
      }
    } else {
      newActions.push(this.buyNone);
    }

    if (
      newActions.length !== this.actions.length ||
      this.actions[0] !== newActions[0]
    ) {
      this.actions = newActions;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  buyOneAct() {
    this.unit.buy(ONE);
  }
  buyHalfAct() {
    this.unit.buy(this.unit.buyPrice.maxBuy.div(2).floor());
  }
  buyMaxAct() {
    this.unit.buy(this.unit.buyPrice.maxBuy);
  }
  getProdId(index: number, production: Production) {
    return index + production.producer.id + production.product.id;
  }
  getPriceId(index: number, pri: Price) {
    return index + pri.spendable.id;
  }
}