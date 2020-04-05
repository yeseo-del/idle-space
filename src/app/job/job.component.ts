import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Job, MyIcon } from "../model/job/job";
import { Subscription } from "rxjs";
import { MainService } from "../main.service";
import { Research } from "../model/researches/research";
import { moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"]
})
export class JobComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() job: Job;
  @Input() collection: Job[];
  @Input() showDescription = true;

  icons: MyIcon[];
  isResearch = false;
  research: Research;
  totalResearchBonus: Decimal;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.job.reloadUi();
    if (this.job instanceof Research) {
      this.research = this.job;
    }
    this.icons = this.job.getIcons();

    this.subscriptions.push(
      this.ms.updateEmitter.subscribe(() => {
        this.job.reloadUi();
        this.cd.markForCheck();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
  getIconId(index: number, myIcon: MyIcon) {
    return myIcon.icon + myIcon.color;
  }
  moveUp() {
    moveItemInArray(
      this.collection,
      this.collection.findIndex((e) => e === this.job),
      0
    );
  }
  moveDown() {
    moveItemInArray(
      this.collection,
      this.collection.findIndex((e) => e === this.job),
      this.collection.length - 1
    );
  }
}
