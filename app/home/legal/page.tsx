import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LegalPage() {
  return (
    <div className="flex flex-col justify-center items-center py-12 px-8 sm:px-20 md:px-44 lg:px-60 xl:px-80">

      <h3 className="text-xl font-bold mb-4">Aspectos Legales</h3>

      <Accordion type="single" defaultValue="item-1" className="w-full">

        <AccordionItem value="item-1">
          <AccordionTrigger>Terminos y condiciones</AccordionTrigger>
          <AccordionContent>
            Al utilizar los servicios de [Nombre de tu Empresa],
            aceptas cumplir con nuestros términos y condiciones.
            Estos términos rigen tu relación con nosotros y establecen
            las condiciones bajo las cuales proporcionamos nuestros servicios.
            Te recomendamos leer detenidamente nuestros términos y condiciones
            [enlace a los términos y condiciones] antes de utilizar nuestros servicios.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Politica de privacidad</AccordionTrigger>
          <AccordionContent>
            [Nombre de tu Empresa] se compromete a proteger la privacidad de sus usuarios.
            Nuestra política de privacidad detalla cómo recopilamos, utilizamos, compartimos y
            protegemos la información personal que recopilamos de nuestros usuarios.
            Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política.
            Puedes leer nuestra política de privacidad completa [enlace a la política de privacidad].
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Nuestras tarifas</AccordionTrigger>
          <AccordionContent>
            Nuestros servicios se ofrecen a tarifas competitivas y transparentes.
            Las tarifas pueden variar según el tipo de servicio que elijas.
            Te recomendamos revisar nuestra página de tarifas [enlace a la página de tarifas]
            para obtener información detallada sobre los costos asociados con
            cada uno de nuestros servicios.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Estandares de calidad</AccordionTrigger>
          <AccordionContent>
            En [Nombre de tu Empresa], nuestra misión es proporcionar 
            productos/servicios de la más alta calidad para satisfacer 
            las necesidades y expectativas de nuestros clientes. 
            Nos comprometemos a mantener estándares excepcionales 
            en todos los aspectos de nuestro negocio y a superar las expectativas en cada interacción.
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}