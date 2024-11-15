import Something from '../../somewhat/index.js'

// To try this, run node prepare-module.
// a demo.js will be created, it will contain import Something from '../../somewhat/index.js'.

import SomethingElse from '../../../@another/somewhat-else/index.js'
import SomethingAgain from '../../../somewhat-again/index.js'

// => import SomethingElse from '../../../@another/somewhat-else/index.js'.
// => import SomethingAgain from '../../../somewhat-again/index.js'.
