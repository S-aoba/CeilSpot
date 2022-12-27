import Python from '../../assets/LanguageIcon/python.png'
import TypeScript from '../../assets/LanguageIcon/typescript.png'
import Javascript from '../../assets/LanguageIcon/javascript.png'
import ReactIcon from '../../assets/LanguageIcon/react.png'
import Java from '../../assets/LanguageIcon/java.png'
import CLang from '../../assets/LanguageIcon/C.png'
import Cplus from '../../assets/LanguageIcon/CPLUSPLUS.png'
import php from '../../assets/LanguageIcon/php.png'
import Ruby from '../../assets/LanguageIcon/ruby.png'
import Perl from '../../assets/LanguageIcon/perl.png'
import Go from '../../assets/LanguageIcon/go.png'
import Swift from '../../assets/LanguageIcon/swift.png'
import Kotlin from '../../assets/LanguageIcon/kotlin.png'
import Rust from '../../assets/LanguageIcon/rust.png'
import DefaultIcon from '../../assets/LanguageIcon/default.png'

export const useSelectQuestionIcon = () => {
  const selectQuestionIcon = (language: string) => {
    switch (language) {
      case 'Python':
        return Python
      case 'TypeScript':
        return TypeScript
      case 'Javascript':
        return Javascript
      case 'React':
        return ReactIcon
      case 'Java':
        return Java
      case 'C':
        return CLang
      case 'C++':
        return Cplus
      case 'PHP':
        return php
      case 'Ruby':
        return Ruby
      case 'Perl':
        return Perl
      case 'Go':
        return Go
      case 'Swift':
        return Swift
      case 'Kotlin':
        return Kotlin
      case 'Rust':
        return Rust
      default:
        return DefaultIcon
    }
  }
  return { selectQuestionIcon }
}
