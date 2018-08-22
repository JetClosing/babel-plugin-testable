class NonTestableClass {
  someFunction() {
    return 'NonTestableClass';
  }
}

// @testable
class TestableClass {
  someFunction() {
    return 'TestableClass';
  }
}

// @testable
export class AlreadyExportedClass {
  someFunction() {
    return 'AlreadyExportedClass';
  }
}
