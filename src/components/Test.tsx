const Test = () => {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Teste do Tailwind
          </div>
          <p className="mt-2 text-gray-500">
            Este é um componente de teste para verificar se o Tailwind CSS está funcionando corretamente.
          </p>
          <button className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Botão de teste
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test; 