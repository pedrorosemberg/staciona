
import { motion } from 'framer-motion';

const partners = [
  "Metadax Tecnologia LTDA",
  "Proz Educação",
  "Prefeitura de Belo Horizonte",
  "PRODABEL",
  "Prefeitura da Cidade de São Paulo",
  "SPTRANS",
  "Prefeitura de Florianópolis",
  "Prefeitura do Rio de Janeiro",
  "Shopping Boulevard"
];

export function Partners() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Parceiros</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-lg flex items-center justify-center text-center min-h-[100px]"
            >
              <p className="text-lg font-medium text-gray-800">{partner}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
