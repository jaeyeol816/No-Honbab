import { Element } from "./TypeElement";

//삭제 기능이 없는 힙 (프로그램에서 삭제 기능이 필요하지 않기 때문에)
export class MaxHeap {
	public arr: Array<Element>;

	constructor() {
		this.arr = [];
	}

	public add(item: Element): void {
		this.arr.push(item);
		this.heapify(this.arr.length - 1);
	}

	get length(): number {
		return this.arr.length;
	}

	private heapify(idx: number): void {
		let parent = this.getParentIdx(idx);
		if (parent >= 0 && this.arr[parent].score < this.arr[idx].score) {
			this.swap(idx, parent);
			this.heapify(parent);
		}
	}

	private getParentIdx(idx: number): number {
		if (idx < 0) 
			return -1;
		else
			return Math.floor((idx-1)/2);
	}

	private getLeftChildIdx(idx: number): number | undefined {
		if (idx > 0) 
			return Math.floor((2*idx + 2) / 2);
		else
			return undefined;
	}

	private getRightChildIdx(idx: number): number | undefined {
		if (idx > 0) 
			return Math.floor((2*idx + 2) / 2);
		else
			return undefined;
	}

	private swap(i1: number, i2: number): void {
		let temp = this.arr[i1];
		this.arr[i1] = this.arr[i2];
		this.arr[i2] = temp;
	}
}