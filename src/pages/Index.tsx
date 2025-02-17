import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Shield, Star, Search, Calendar, CreditCard } from "lucide-react";
import { Map } from "@/components/Map";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Partners } from "@/components/Partners";

const Index = () => {
  const [activeTab, setActiveTab] = useState("buscar");
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const basePrice = 15;
  const insurancePrice = 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src="/Group 886.png" alt="Staciona Logo" className="h-8" />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Recursos</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">Sobre</a>
            <a href="#partners" className="text-gray-600 hover:text-primary transition-colors">Parceiros</a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Encontre e reserve vagas de estacionamento em segundos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              Simplifique sua rotina com informações precisas, reservas antecipadas e preços exclusivos
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#demo" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Experimente Agora
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Busca Inteligente</h3>
              <p className="text-gray-600">Encontre estacionamentos próximos com filtros avançados de pesquisa</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reserva Antecipada</h3>
              <p className="text-gray-600">Garanta sua vaga com antecedência e evite surpresas</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Preços Exclusivos</h3>
              <p className="text-gray-600">Aproveite descontos especiais e promoções para usuários</p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  {["buscar", "reservar", "avaliar"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-center font-medium ${
                        activeTab === tab
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      aria-selected={activeTab === tab}
                      role="tab"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                {activeTab === "buscar" && (
                  <div className="space-y-4">
                    <Map />
                    <div className="flex gap-4 mb-6">
                      <input
                        type="text"
                        placeholder="Digite o endereço ou local"
                        className="flex-1 px-4 py-2 border rounded-lg"
                        aria-label="Endereço para busca"
                      />
                      <button 
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Buscar estacionamentos"
                      >
                        Buscar
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">Estacionamento {i}</h4>
                              <p className="text-sm text-gray-500">Rua Example, {i}00</p>
                            </div>
                            <span className="text-green-600 font-medium">R$ {15 + i},00/h</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {0.1 * i}km
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              24h
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {4.0 + i/10}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "reservar" && (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Estacionamento Selecionado</h4>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-gray-600">Rua Example, 100</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="w-4 h-4" />
                            4.8 (256 avaliações)
                          </div>
                        </div>
                        <span className="text-green-600 font-medium">
                          R$ {includeInsurance ? basePrice + insurancePrice : basePrice},00/h
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="insurance"
                          checked={includeInsurance}
                          onChange={(e) => setIncludeInsurance(e.target.checked)}
                          className="w-4 h-4 text-primary"
                        />
                        <label htmlFor="insurance" className="text-sm text-gray-700">
                          Adicionar seguro contra danos, furto e roubo (+R$ {insurancePrice},00/h)
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Entrada
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horário
                        </label>
                        <input
                          type="time"
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Confirmar Reserva
                    </button>
                  </div>
                )}
                {activeTab === "avaliar" && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h4 className="font-semibold mb-2">Como foi sua experiência?</h4>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="p-2 hover:text-yellow-400 transition-colors"
                          >
                            <Star className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <textarea
                        placeholder="Conte-nos mais sobre sua experiência (opcional)"
                        className="w-full px-4 py-3 border rounded-lg resize-none h-32"
                      />
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Enviar Avaliação
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Partners />

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/Group 886.png" alt="Staciona Logo" className="h-8 mb-4" />
              <p className="text-sm">
                Simplificando sua busca por estacionamento com tecnologia e inovação.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Desenvolvido por</h4>
              <ul className="space-y-2">
                <li>Pedro Rosemberg</li>
                <li>Ana Carolina</li>
                <li>José</li>
                <li>Kauan</li>
                <li>Thales</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li>contato@staciona.com.br</li>
                <li>+55 (11) 93473-8412</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Staciona. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
