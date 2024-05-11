import toast from "react-hot-toast";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import useForm from "./useForm";
import { getRandomChar, getSpecialChar } from "./utils";

function App() {
  const [values, setValues] = useForm({
    length: 6,
    capital: true,
    small: true,
    number: false,
    symbol: false,
  });
  const [result, setResult] = useState("");

  const fieldsArray = [
    { filed: values.capital, getChar: () => getRandomChar(65, 90) },
    { filed: values.small, getChar: () => getRandomChar(97, 122) },
    { filed: values.number, getChar: () => getRandomChar(48, 57) },
    { filed: values.symbol, getChar: () => getSpecialChar() },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";

    const checkedFields = fieldsArray.filter(({ filed }) => filed);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
    } else {
      toast.error("Please select at least one option");
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard");
    } else {
      toast.error("No password to copy");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Генератор паролей</h1>
        <div className="card__head">
          <input
            className="card__head-input"
            type="text"
            placeholder="Min 6 char"
            value={result}
            readOnly
          />
          <button
            className="card__head-btn"
            type="button"
            onClick={copyToClipboard}
          >
            <FaClipboard />
          </button>
        </div>

        <form className="card__form" onSubmit={handleOnSubmit}>
          <div className="card__field">
            <label htmlFor="length">Длина</label>
            <input
              type="number"
              name="length"
              id="length"
              min={6}
              max={12}
              value={values.length}
              onChange={setValues}
            />
          </div>
          <div className="card__field">
            <label htmlFor="capital">Заглавные буквы</label>
            <input
              type="checkbox"
              name="capital"
              id="capital"
              checked={values.capital}
              onChange={setValues}
            />
          </div>
          <div className="card__field">
            <label htmlFor="small">Строчные буквы</label>
            <input
              type="checkbox"
              name="small"
              id="small"
              checked={values.small}
              onChange={setValues}
            />
          </div>
          <div className="card__field">
            <label htmlFor="number">Цифры</label>
            <input
              type="checkbox"
              name="number"
              id="number"
              checked={values.number}
              onChange={setValues}
            />
          </div>
          <div className="card__field">
            <label htmlFor="symbol">Символы</label>
            <input
              type="checkbox"
              name="symbol"
              id="symbol"
              checked={values.symbol}
              onChange={setValues}
            />
          </div>
          <button className="card__form-btn">Создать пароль</button>
        </form>
      </div>
    </div>
  );
}

export default App;
