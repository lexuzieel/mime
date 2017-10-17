var common = require('./_common.js');
var Test = common.Test;
var MIME = require('../index.js');
var tests = [
  // Test methods with the most dependencies first:
  ['isAText', '', false],
  [
    'isAText',
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '0123456789' +
    '!#$%&\'*+-/=?^_`{|}~',
    true
  ],
  ['isAText', '\t', false],
  ['isAText', ' ', false],
  ['isAText', '\r', false],
  ['isAText', '\n', false],
  ['isAText', 'a.a', false],
  ['isAText', '"', false],
  ['isAText', '<', false],
  ['isAText', '>', false],
  ['isAText', ',', false],
  ['isAText', ';', false],

  ['isAtom', '', false],
  [
    'isAtom',
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '0123456789' +
    '!#$%&\'*+-/=?^_`{|}~',
    true
  ],
  ['isAtom', '\t', false],
  ['isAtom', ' ', false],
  ['isAtom', '\r', false],
  ['isAtom', '\n', false],
  ['isAtom', 'a.a', false],
  ['isAtom', '"', false],
  ['isAtom', '<', false],
  ['isAtom', '>', false],
  ['isAtom', ',', false],
  ['isAtom', ';', false],

  ['isDText', '', false],
  ['isDText', '\t', false],
  ['isDText', '\r', false],
  ['isDText', '\n', false],
  ['isDText', ' ', false],
  ['isDText', '"', true],
  ['isDText', '""', true],
  ['isDText', '"""', true],
  ['isDText', String.fromCharCode(33), true],
  ['isDText', String.fromCharCode(90), true],
  ['isDText', String.fromCharCode(91), false],
  ['isDText', String.fromCharCode(92), false],
  ['isDText', String.fromCharCode(93), false],
  ['isDText', String.fromCharCode(94), true],
  ['isDText', String.fromCharCode(126), true],

  ['isDotAtom', '', false],
  ['isDotAtom', '\t', false],
  ['isDotAtom', '\r', false],
  ['isDotAtom', '\n', false],
  ['isDotAtom', ' ', false],
  ['isDotAtom', 'a a', false],
  ['isDotAtom', '.a', false],
  ['isDotAtom', '..a', false],
  ['isDotAtom', '...a', false],
  ['isDotAtom', '....a', false],
  ['isDotAtom', 'a.', false],
  ['isDotAtom', 'a..', false],
  ['isDotAtom', 'a...', false],
  ['isDotAtom', 'a....', false],
  ['isDotAtom', 'a..a', false],
  ['isDotAtom', 'a...a', false],
  ['isDotAtom', 'a....a', false],
  ['isDotAtom', 'a.a', true],

  ['isDomainLiteral', '', false],
  ['isDomainLiteral', '[', false],
  ['isDomainLiteral', ']', false],
  ['isDomainLiteral', '[[', false],
  ['isDomainLiteral', ']]', false],
  ['isDomainLiteral', '[]', true],
  ['isDomainLiteral', '[.]', true],
  ['isDomainLiteral', '[.a]', true],
  ['isDomainLiteral', '[a.]', true],
  ['isDomainLiteral', '[a.a]', true],
  ['isDomainLiteral', '[.\t\r\n .\t\r\n .]', true],
  ['isDomainLiteral', '[' + String.fromCharCode(91) + ']', false],
  ['isDomainLiteral', '[' + String.fromCharCode(92) + ']', false],
  ['isDomainLiteral', '[' + String.fromCharCode(93) + ']', false],
  ['isDomainLiteral', '[[]', false],
  ['isDomainLiteral', '[]]', false],
  ['isDomainLiteral', '[[]]', false],

  ['isDomain', '', false],
  ['isDomain', ' ', false],
  ['isDomain', '.', false],
  ['isDomain', '..', false],
  ['isDomain', '...', false],
  ['isDomain', '....', false],
  ['isDomain', 'ronomon.com', true],
  ['isDomain', '<ronomon.com>', false],
  ['isDomain', '"ronomon.com"', false],
  ['isDomain', 'ronomon.com,', false],
  ['isDomain', 'ronomon.com;', false],
  ['isDomain', '[]', true],
  ['isDomain', '[ ]', true],
  ['isDomain', '[\t\r\n .]', true],
  ['isDomain', '[1.1.1.1.1.1.1]', true],
  ['isDomain', '[1000.1000.1000.1000]', true],

  ['isQuotedPair', '', false],
  ['isQuotedPair', '\\', false],
  ['isQuotedPair', '\\  ', false],
  ['isQuotedPair', ' \\', false],
  ['isQuotedPair', '\\ ', true],
  ['isQuotedPair', '\\\t', true],
  ['isQuotedPair', '\\\r', false],
  ['isQuotedPair', '\\\n', false],
  ['isQuotedPair', '\\' + String.fromCharCode(33), true],
  ['isQuotedPair', '\\' + String.fromCharCode(126), true],
  ['isQuotedPair', '\\' + String.fromCharCode(127), false],

  ['isQText', '', false],
  ['isQText', ' ', false],
  ['isQText', '\t', false],
  ['isQText', '\r', false],
  ['isQText', '\n', false],
  ['isQText', String.fromCharCode(33), true],
  ['isQText', String.fromCharCode(34), false],
  ['isQText', String.fromCharCode(35), true],
  ['isQText', String.fromCharCode(91), true],
  ['isQText', String.fromCharCode(92), false],
  ['isQText', String.fromCharCode(93), true],
  ['isQText', String.fromCharCode(33) + String.fromCharCode(126), true],
  ['isQText', String.fromCharCode(127), false],

  ['isQContent', '', false],
  ['isQContent', '\t \r \n ', true],
  ['isQContent', '\\', false],
  ['isQContent', ' \\\r', false],
  ['isQContent', String.fromCharCode(34), false],
  ['isQContent', String.fromCharCode(92), false],
  ['isQContent', ' \\' + String.fromCharCode(34) + ' ', true],
  ['isQContent', ' \\' + String.fromCharCode(92) + ' ', true],
  ['isQContent', '\\ ', true],
  ['isQContent', '\\ ' + String.fromCharCode(127), false],
  ['isQContent', '""', false],

  ['isQuotedString', '', false],
  ['isQuotedString', '  ', false],
  ['isQuotedString', '"', false],
  ['isQuotedString', '"""', false],
  ['isQuotedString', '""""', false],
  ['isQuotedString', '""', true],
  ['isQuotedString', '" "', true],
  ['isQuotedString', '" \\"\\" "', true],

  ['isLocalPart', '', false],
  ['isLocalPart', ' ', false],
  ['isLocalPart', ' @', false],
  ['isLocalPart', 'joran dirk', false],
  ['isLocalPart', '.jorandirk', false],
  ['isLocalPart', '..jorandirk', false],
  ['isLocalPart', 'jorandirk.', false],
  ['isLocalPart', 'jorandirk..', false],
  ['isLocalPart', 'joran..dirk', false],
  ['isLocalPart', 'joran...dirk', false],
  ['isLocalPart', 'joran.dirk', true],
  ['isLocalPart', '""', true],
  ['isLocalPart', '" "', true],
  ['isLocalPart', '"""', false],
  ['isLocalPart', '""""', false],
  ['isLocalPart', '"joran \\"\\\\\\"dirk @ greef"', true],

  ['isNoFoldLiteral', '', false],
  ['isNoFoldLiteral', '[', false],
  ['isNoFoldLiteral', ']', false],
  ['isNoFoldLiteral', '[[]', false],
  ['isNoFoldLiteral', '[]]', false],
  ['isNoFoldLiteral', '[[]]', false],
  ['isNoFoldLiteral', '[ ]', false],
  ['isNoFoldLiteral', '["]', true],
  ['isNoFoldLiteral', '[]', true],
  ['isNoFoldLiteral', '[...1...a...]', true],

  ['isMsgID', '', false],
  ['isMsgID', ' ', false],
  ['isMsgID', 'a@a', false],
  ['isMsgID', '<a@a', false],
  ['isMsgID', '<<a@a', false],
  ['isMsgID', 'a@a>', false],
  ['isMsgID', 'a@a>>', false],
  ['isMsgID', '<<a@a>>', false],
  ['isMsgID', '<a@>', false],
  ['isMsgID', '<@a>', false],
  ['isMsgID', '<a@a>', true],
  ['isMsgID', '<a@[]>', true],
  ['isMsgID', '<a@[...1...]>', true],
  ['isMsgID', '<a@[1.1 ]>', false],
  ['isMsgID', '<[1]@a>', false],

  ['isAddrSpec', '', false],
  ['isAddrSpec', 'a@', false],
  ['isAddrSpec', '@a', false],
  ['isAddrSpec', '<>', false],
  ['isAddrSpec', '<joran@ronomon.com>', false],
  ['isAddrSpec', 'joran@ronomon.com ', false],
  ['isAddrSpec', ' joran@ronomon.com', false],
  ['isAddrSpec', ',joran@ronomon.com', false],
  ['isAddrSpec', ';joran@ronomon.com', false],
  ['isAddrSpec', '<joran@ronomon.com', false],
  ['isAddrSpec', 'joran@ronomon.com>', false],
  ['isAddrSpec', 'joran@ronomon..com', false],
  ['isAddrSpec', 'jora..n@ronomon.com', false],
  ['isAddrSpec', 'joran@ronomon.com', true],
  ['isAddrSpec', '"jor"an@ronomon.com', false],
  ['isAddrSpec', '"joran"@ronomon.com', true],
  ['isAddrSpec', '"joran dirk greef"@ronomon.com', true],
  ['isAddrSpec', '"@"@ronomon.com', true],
  ['isAddrSpec', '""@ronomon.com', true],
  ['isAddrSpec', '""@[]', true],
  ['isAddrSpec', '""@[1000.1.1.1.1]', true],

  ['isAngleAddr', '', false],
  ['isAngleAddr', ' ', false],
  ['isAngleAddr', '<', false],
  ['isAngleAddr', '<<', false],
  ['isAngleAddr', '>', false],
  ['isAngleAddr', '>>', false],
  ['isAngleAddr', '<<>>', false],
  ['isAngleAddr', '<>', false],
  ['isAngleAddr', '<joran@ronomon..com>', false],
  ['isAngleAddr', '<joran@ronomon.com>', true],

  ['isPhrase', '', false],
  ['isPhrase', ' ', false],
  ['isPhrase', 'a.a', false],
  ['isPhrase', 'aa', true],
  ['isPhrase', '"\\""', true],
  ['isPhrase', '""', true],
  ['isPhrase', '"""', false],
  ['isPhrase', '""""', false],

  ['isNameAddr', '', false],
  ['isNameAddr', ' ', false],
  ['isNameAddr', 'joran', false],
  ['isNameAddr', '<joran@ronomon.com', false],
  ['isNameAddr', '<joran@ronomon.com>', true],
  ['isNameAddr', ' <joran@ronomon.com>', false],
  ['isNameAddr', '\t\r\n <joran@ronomon.com>', false],
  ['isNameAddr', '"Joran Dirk ..@ Greef"\t\r\n <joran@ronomon.com>', true],
  ['isNameAddr', ' "Joran Dirk Greef" <joran@ronomon.com>', false],
  ['isNameAddr', ' Joran.Greef <joran@ronomon.com>', false],
  ['isNameAddr', ' Joran <joran@ronomon.com>', false],
  ['isNameAddr', 'Joran <joran@ronomon.com>', true],

  ['isMailbox', '<joran@ronomon.com', false],
  ['isMailbox', 'joran@ronomon.com>', false],
  ['isMailbox', ' joran@ronomon.com', false],
  ['isMailbox', 'joran@ronomon.com ', false],
  ['isMailbox', 'joran@ronomon.com', true],
  ['isMailbox', '"@"@ronomon.com', true],
  ['isMailbox', '<joran@ronomon.com>', true],
  ['isMailbox', ' <joran@ronomon.com>', false],
  ['isMailbox', '<joran@ronomon.com> ', false],
  ['isMailbox', 'Joran <joran@ronomon.com>', true],
  ['isMailbox', ' Joran <joran@ronomon.com>', false],
  ['isMailbox', '"@" <joran@ronomon.com>', true],
  ['isMailbox', 'Joran joran@ronomon.com', false],

  ['isPath', '', false],
  ['isPath', '  ', false],
  ['isPath', '<', false],
  ['isPath', '<<', false],
  ['isPath', '<<<', false],
  ['isPath', '>', false],
  ['isPath', '>>', false],
  ['isPath', '>>>', false],
  ['isPath', '<<>', false],
  ['isPath', '<>>', false],
  ['isPath', '<>', true],
  ['isPath', '<joran@ronomon.com>', true],
  ['isPath', '<"joran"@ronomon.com>', true]
];
tests.forEach(
  function(test) {
    Test.equal(
      MIME[test[0]](Buffer.from(test[1], 'utf-8')),
      test[2],
      'MIME.' + test[0],
      JSON.stringify(test[1])
    );
  }
);