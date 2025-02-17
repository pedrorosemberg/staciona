
import { motion } from 'framer-motion';

const partners = [
  {
    name: "Metadax Tecnologia LTDA",
    logo: "/partners/metadax.png", // Substitua pelo caminho real da logo quando disponível
    description: "Soluções tecnológicas inovadoras"
  },
  {
    name: "Proz Educação",
    logo: "/partners/prozed.png",
    description: "Educação profissionalizante de qualidade"
  },
  {
    name: "Prefeitura de Belo Horizonte",
    logo: "/partners/pbh.png",
    description: "Administração municipal de BH"
  },
  {
    name: "PRODABEL",
    logo: "/partners/prodabel.png",
    description: "Empresa de Informática e Informação de BH"
  },
  {
    name: "Prefeitura da Cidade de São Paulo",
    logo: "/partners/pmsp.png",
    description: "Administração municipal de SP"
  },
  {
    name: "SPTRANS",
    logo: "/partners/sptrans.png",
    description: "Transporte público de São Paulo"
  },
  {
    name: "Prefeitura de Florianópolis",
    logo: "/partners/floripa.png",
    description: "Administração municipal de Florianópolis"
  },
  {
    name: "Prefeitura do Rio de Janeiro",
    logo: "/partners/rio.png",
    description: "Administração municipal do RJ"
  },
  {
    name: "Shopping Boulevard",
    logo: "/partners/boulevard.jpg",
    description: "Centro comercial de referência"
  }
];

export function Partners() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Parceiros</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-lg flex flex-col items-center justify-center text-center"
            >
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{partner.name}</h3>
              <p className="text-sm text-gray-600">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
