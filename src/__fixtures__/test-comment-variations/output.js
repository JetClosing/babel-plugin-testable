// @testable this is a testable field
export const testableConst1 = true;

// @testable - this is also a testable field

export const testableConst2 = true;

// @testable: some comment about a testable field

export const testableConst3 = true;

//@testable

export const testableConst4 = true;

//          @testable this is a testable field

export const testableConst5 = true;

// Dangling spaces after this one
//@testable    

export const testableConst6 = true;

//_@testable

const nonTestableConst1 = false;

//a@testable
const nonTestableConst2 = false;

//@testableFalse

const nonTestableConst3 = false;

// testable
const nonTestableConst4 = false;
