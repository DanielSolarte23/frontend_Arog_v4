import RegistroForm from "@/components/publicas/RegistroForm";

function page() {

  return (
    <div className="min-h-screen w-full">
      <main className="min-h-screen flex justify-center items-center p-4 hoja-dos">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 xl-plus:w-4/10">
          <RegistroForm/>
        </div>
      </main>
    </div>
  );
}

export default page;