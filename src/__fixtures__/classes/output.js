class NonTestableClass {
  someFunction() {
    return 'NonTestableClass';
  }
}

// @testable
export class TestableClass {
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
