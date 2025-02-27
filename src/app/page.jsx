import Bienvenida from "../components/publicas/Bienvenida";
import FotterHome from "../components/publicas/FooterHome";
import Servicios from "../components/publicas/Servicios";
import SobreNosotros from "../components/publicas/SobreNostros";

export default function Home() {
  return (
    <>
      <Bienvenida />
      <Servicios />
      <SobreNosotros/>
      <FotterHome />
    </>
  );
}