import LoginForm from "@/components/publicas/LoginForm";

function page() {
  return (
    <div className="min-h-screen w-full">
      <main className="flex min-h-screen justify-center items-center p-4 hoja-dos">
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 xl-plus:w-4/10">
            <LoginForm />
        </div>
      </main>
    </div>
  );
}

export default page;