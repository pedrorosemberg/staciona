import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  Shield, 
  Bike, 
  Building2, 
  Search, 
  Calendar, 
  CreditCard,
  Battery,
  Moon,
  ShoppingBag,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { Map } from "@/components/Map";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Partners } from "@/components/Partners";
import { StarRating } from "@/components/StarRating";
import { useReservation } from "@/hooks/useReservation";
import { ParkingSpot } from "@/types/map";

interface ReservationInfo {
  spot: ParkingSpot | null;
  date: Date | null;
  time: string | null;
  endDate: Date | null;
  endTime: string | null;
  includeInsurance: boolean;
}

const calculateTotalHours = (startDate: Date, startTime: string, endDate: Date, endTime: string): number => {
  const start = new Date(startDate);
  const [startHours, startMinutes] = startTime.split(':');
  start.setHours(parseInt(startHours), parseInt(startMinutes));

  const end = new Date(endDate);
  const [endHours, endMinutes] = endTime.split(':');
  end.setHours(parseInt(endHours), parseInt(endMinutes));

  const diffInMs = end.getTime() - start.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return Math.max(0, Math.ceil(diffInHours));
};

const calculateInsuranceCost = (hours: number): number => {
  // Base insurance cost between R$5 and R$20 per hour
  return Math.min(20, Math.max(5, Math.ceil(hours * 5)));
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("buscar");
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [orderNumber] = useState(`STN${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  const { reservationInfo, setSpot, setDate, setTime, setInsurance, setEndDate, setEndTime } = useReservation();

  const handleTabChange = (tab: string) => {
    if (tab === "reservar" && !reservationInfo.spot) {
      toast.error("Por favor, selecione um estacionamento primeiro!");
      return;
    }
    if (tab === "avaliar" && (!reservationInfo.date || !reservationInfo.time)) {
      toast.error("Por favor, complete sua reserva primeiro!");
      return;
    }
    setActiveTab(tab);
  };

  const validateDateTime = (date: Date, time: string, endDate: Date, endTime: string): boolean => {
    const start = new Date(date);
    const [startHours, startMinutes] = time.split(':');
    start.setHours(parseInt(startHours), parseInt(startMinutes));

    const end = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    end.setHours(parseInt(endHours), parseInt(endMinutes));

    if (end.getTime() <= start.getTime()) {
      toast.error("O horário de check-out deve ser posterior ao horário de check-in!");
      return false;
    }

    const diffInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (diffInHours <= 0) {
      toast.error("O período de estacionamento deve ser maior que zero horas!");
      return false;
    }

    return true;
  };

  const handleReservation = () => {
    if (!reservationInfo.date || !reservationInfo.time || !reservationInfo.endDate || !reservationInfo.endTime) {
      toast.error("Por favor, preencha todos os campos de data e hora!");
      return;
    }

    if (!validateDateTime(reservationInfo.date, reservationInfo.time, reservationInfo.endDate, reservationInfo.endTime)) {
      return;
    }

    toast.success("Reserva confirmada! Em breve você receberá os dados da reserva.");
    
    setTimeout(() => {
      setActiveTab("avaliar");
    }, 2000); // Reduzido de 15000 para 2000 ms
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleRatingSubmit = () => {
    if (selectedRating > 0) {
      setShowReservationDetails(true);
      toast.success("Agradecemos sua avaliação! Por este gesto, você recebeu um cupom de 30%OFF para você e um amigo! Use AVALIA30 ao realizar o pagamento.");
    } else {
      toast.error("Por favor, selecione uma avaliação antes de enviar!");
    }
  };

  const calculateTotalCost = () => {
    if (!reservationInfo.spot || !reservationInfo.date || !reservationInfo.time || 
        !reservationInfo.endDate || !reservationInfo.endTime) {
      return null;
    }

    const totalHours = calculateTotalHours(
      reservationInfo.date,
      reservationInfo.time,
      reservationInfo.endDate,
      reservationInfo.endTime
    );

    const parkingCost = totalHours * reservationInfo.spot.price;
    const insuranceCost = reservationInfo.includeInsurance ? calculateInsuranceCost(totalHours) * totalHours : 0;

    return {
      hours: totalHours,
      parkingCost,
      insuranceCost,
      total: parkingCost + insuranceCost
    };
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          toast.success("Localização obtida com sucesso!");
        },
        () => {
          toast.error("Por favor, permita o acesso à sua localização para uma melhor experiência.");
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/8d1af52a-0edd-4e38-b22a-29574814832f.png" 
              alt="Staciona Logo"
              className="h-8"
            />
          </div>
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
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Segurança em primeiro lugar</h3>
              <p className="text-gray-600">Estacione seu veículo com seguro por danos, roubo e furto</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bike className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Estacionamento para motos</h3>
              <p className="text-gray-600">Encontre estacionamentos seguros para sua moto</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Estacionamentos cobertos</h3>
              <p className="text-gray-600">Encontre vagas cobertas e privativas para seu veículo</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Busca inteligente</h3>
              <p className="text-gray-600">Encontre estacionamentos próximos com filtros avançados de pesquisa</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reserva antecipada</h3>
              <p className="text-gray-600">Garanta sua vaga com antecedência e evite surpresas</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Preços exclusivos</h3>
              <p className="text-gray-600">Aproveite descontos especiais e promoções para usuários</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Charge point</h3>
              <p className="text-gray-600">Estacione seu veículo elétrico em um de nossos Charge Points</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Moon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Estacionamento noturno</h3>
              <p className="text-gray-600">Encontre os locais mais seguros a noite (disponível até 22h00)</p>
            </div>
            <div className="feature-card p-6 rounded-xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Parceiros</h3>
              <p className="text-gray-600">Estacione em lojas de pareiros, compre e receba descontos exclusivos</p>
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
                      onClick={() => handleTabChange(tab)}
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
                    <Map onSpotSelect={(spot) => {
                      setSpot(spot);
                      toast.success("Estacionamento selecionado!");
                    }} />
                  </div>
                )}
                
                {activeTab === "reservar" && reservationInfo.spot && (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{reservationInfo.spot.title}</h4>
                      <p className="text-gray-600">{reservationInfo.spot.address}</p>
                      <div className="mt-4">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Check-in</label>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                </div>
                                <div>
                                  <input
                                    type="time"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setTime(e.target.value)}
                                    step="300"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Check-out</label>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                    min={reservationInfo.date ? reservationInfo.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                  />
                                </div>
                                <div>
                                  <input
                                    type="time"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setEndTime(e.target.value)}
                                    step="300"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            id="insurance"
                            checked={reservationInfo.includeInsurance}
                            onChange={(e) => setInsurance(e.target.checked)}
                            className="w-4 h-4"
                          />
                          <label htmlFor="insurance" className="text-sm">
                            Adicionar seguro contra furto, roubo e danos enquanto estiver estacionado? (+R$5 a R$20/h)
                          </label>
                        </div>
                        {reservationInfo.date && reservationInfo.time && reservationInfo.endDate && reservationInfo.endTime && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-semibold mb-2">Resumo do Valor</h5>
                            {(() => {
                              const costs = calculateTotalCost();
                              if (!costs) return null;
                              return (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Tempo total:</span>
                                    <span>{costs.hours} hora(s)</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Valor do estacionamento:</span>
                                    <span>R$ {costs.parkingCost.toFixed(2)}</span>
                                  </div>
                                  {reservationInfo.includeInsurance && (
                                    <div className="flex justify-between text-sm">
                                      <span>Valor do seguro:</span>
                                      <span>R$ {costs.insuranceCost.toFixed(2)}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                    <span>Valor Total:</span>
                                    <span>R$ {costs.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleReservation}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Confirmar Reserva
                    </button>
                  </div>
                )}

                {activeTab === "avaliar" && (
                  <div className="space-y-6">
                    {!showReservationDetails ? (
                      <div className="text-center">
                        <h4 className="font-semibold mb-4">Como foi sua experiência?</h4>
                        <StarRating onRatingChange={handleRatingChange} />
                        <textarea
                          placeholder="Conte-nos mais sobre sua experiência (opcional)"
                          className="w-full p-4 border rounded-lg h-32 resize-none mt-4"
                        />
                        <button
                          onClick={handleRatingSubmit}
                          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
                        >
                          Enviar Avaliação
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-xl font-semibold mb-4">Detalhes da Reserva</h3>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="font-medium">Número do Pedido:</span>
                              <span className="font-mono">{orderNumber}</span>
                            </div>

                            <div className="bg-white p-4 rounded-lg space-y-2">
                              <h4 className="font-semibold">{reservationInfo.spot?.title}</h4>
                              <p className="text-gray-600">{reservationInfo.spot?.address}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{reservationInfo.spot?.rating.toFixed(1)}</span>
                              </div>
                              <p className="text-blue-600 font-medium">
                                Valor por hora: R$ {reservationInfo.spot?.price.toFixed(2)}
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium">Check-in</span>
                                </div>
                                <p>{reservationInfo.date?.toLocaleDateString()} às {reservationInfo.time}</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium">Check-out</span>
                                </div>
                                <p>{reservationInfo.endDate?.toLocaleDateString()} às {reservationInfo.endTime}</p>
                              </div>
                            </div>

                            {(() => {
                              const costs = calculateTotalCost();
                              if (!costs) return null;
                              return (
                                <div className="space-y-2 bg-white p-4 rounded-lg">
                                  <div className="flex justify-between">
                                    <span>Tempo total:</span>
                                    <span>{costs.hours} hora(s)</span>
                                  </div>
                                  <div className="flex justify-between text-sm text-gray-600">
                                    <span>Valor da hora:</span>
                                    <span>R$ {reservationInfo.spot?.price.toFixed(2)}</span>
                                  </div>
                                  {reservationInfo.includeInsurance && (
                                    <div className="flex justify-between">
                                      <span>Seguro (por hora):</span>
                                      <span>R$ {calculateInsuranceCost(costs.hours).toFixed(2)}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                    <span>Valor Total:</span>
                                    <span>R$ {costs.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Instruções de Estacionamento</h3>
                          <ol className="space-y-4 list-decimal pl-4">
                            <li>Ir no estacionamento no endereço de check-in e informar o número do pedido.</li>
                            <li>Ao realizar o check-out, faça o pagamento diretamente ao estacionamento ou pelo StacionaApp, por cartão de crédito, débito ou pix.</li>
                            <li>Use o cupom da avaliação na próxima vez que for estacionar, é só incluir no momento de pagar a reserva. O uso de cupons são válidos apenas pelo aplicativo.</li>
                          </ol>
                        </div>

                        <WhatsAppButton />
                      </div>
                    )}
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
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/fa976431-dd52-4d4f-8ac0-0dea6869605e.png"
                  alt="Staciona Logo"
                  className="h-6 brightness-200"
                />
              </div>
              <p className="text-sm">
                Simplificando sua busca por estacionamento com tecnologia e inovação.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Desenvolvido por</h4>
              <ul className="space-y-2">
                <li>Pedro Rosemberg, Ana Carolina, José, Kauan e Thales.</li>
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
