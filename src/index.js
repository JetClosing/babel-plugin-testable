module.exports = function (input) {
  const COMMENT_PLACEHOLDER = '##comment##';
  const DEFAULT_TEST_COMMENT = 'testable';
  const DEFAULT_TEST_COMMENT_REGEX = `^\\s*@${COMMENT_PLACEHOLDER}\\b`;

  // Configurable options
  let enabled = false;
  let debugEnabled = false;
  let testableRegex;

  const log = (...logs) => {
    if (!debugEnabled) {
      return;
    }

    console.log('[babel-plugin-testable]', ...logs);
  }

  const readOptions = (options) => {
    debugEnabled = options.debug;

    const testComment = options.testComment || DEFAULT_TEST_COMMENT;
    const testCommentRegex = options.testCommentRegex || DEFAULT_TEST_COMMENT_REGEX;

    testableRegex = new RegExp(testCommentRegex.replace(COMMENT_PLACEHOLDER, testComment));
    log('Read options', options);

    enabled = isTestEnvironment();
    if (!enabled) {
      log('Plugin disabled');
    }
  }

  const isTestableComment = (comment) => {
    const isTestable = testableRegex.test(comment.value);
    log(`Checking comment: '${comment.value}'`, isTestable);
    return isTestable;
  };

  const hasTestableComment = (path) => {
    if (path.node.leadingComments) {
      const isTestable = path.node.leadingComments.some((comment) => isTestableComment(comment));
      log('isLeadingCommentTestable', isTestable);
      return isTestable;
    }

    const previousPath = path.getPrevSibling()
    if (previousPath.node && previousPath.node.trailingComments) {
      const isTestable = previousPath.node.trailingComments.some((comment) => isTestableComment(comment));
      log('isPrevTrailingCommentTestable', isTestable);
      return isTestable;
    }

    log('No comments to process');
    return false;
  }

  const isTestEnvironment = () => {
    const isTestEnv = (process.env.NODE_ENV === 'test' 
      || process.env.BABEL_ENV === 'test'
      || typeof global.it === 'function');
      
    log('isTestEnvironment', isTestEnv);
    return isTestEnv;
  }

  const processDeclaration = (types, path, state) => {
    if (!enabled) {
      return;
    }

    log('Processing node', path.node);

    if (types.isExportNamedDeclaration(path.parent)) {
      log('Export already declared');
      return;
    }

    const isTestable = hasTestableComment(path);
    if (!isTestable) {
      log('Declaration is not testable');
      return;
    }

    log('Exporting declaration');
    path.replaceWith(types.exportNamedDeclaration(path.node, []));
  };

  return {
    visitor: {
      Program(path, state) {
        readOptions(state.opts);
      },
      VariableDeclaration(path, state) {
        processDeclaration(input.types, path, state);
      },
      FunctionDeclaration(path, state) {
        processDeclaration(input.types, path, state);
      },
      ClassDeclaration(path, state) {
        processDeclaration(input.types, path, state);
      },
    }
  };
}