
import locale from '../../locales';
const Text = ({ text }) => {
  const lang = 'ru'
  const checkKey = locale[lang].hasOwnProperty(text);
  if (checkKey) {
    const value = locale[lang][text]
    return value
  }
};

export default Text;
