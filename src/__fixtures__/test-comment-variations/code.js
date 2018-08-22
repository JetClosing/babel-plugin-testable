// @testable this is a testable field
const testableConst1 = true;

// @testable - this is also a testable field
const testableConst2 = true;

// @testable: some comment about a testable field
const testableConst3 = true;

//@testable
const testableConst4 = true;

//          @testable this is a testable field
const testableConst5 = true;

// Dangling spaces after this one
//@testable    
const testableConst6 = true;

//_@testable
const nonTestableConst1 = false;

//a@testable
const nonTestableConst2 = false;

//@testableFalse

const nonTestableConst3 = false;

// testable
const nonTestableConst4 = false;
