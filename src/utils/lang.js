import en from './lang/en'
import zh from './lang/zh'
import util from './util'

const translate = (folder, name) => {
  let top = zh
  if (folder)
    top = top[folder]
  return top[util.strToUnderline(name)]
}

export default translate
