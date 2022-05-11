
export const getAgeScore = (age1: number, age2: number) => {
	let ageDiff = Math.abs(age1 - age2);
	if (ageDiff >= 0 && ageDiff <= 2) 
		return 10;
	else 
		return 12 - ageDiff;
}
