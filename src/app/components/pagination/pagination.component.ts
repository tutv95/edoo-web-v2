import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() args: any = {};
    @Input() public classId;
    @Input() public currentPage = 1;

    public numbers = [];

    constructor() {
    }

    ngOnInit() {
        for (var i = 0; i < this.args.pageCount; i++) {
            this.numbers.push(i + 1);
        }
    }

}
