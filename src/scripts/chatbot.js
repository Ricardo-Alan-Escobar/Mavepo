document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos DOM
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chatbot-messages');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');
  
    const tractorKnowledge = {
        'saludo': [
          'Hola, ¿en qué puedo ayudarte con los productos de Mavepo?',
          '¡Bienvenido a Mavepo Asistencia! ¿Buscas un tractor, cosechadora o implemento?',
          'Hola, soy el asistente virtual especializado en equipos Massey Ferguson. ¿Cómo puedo ayudarte hoy?'
        ],
        'despedida': [
          'Gracias por confiar en Mavepo. ¡Hasta pronto!',
          'Estamos para servirte cuando lo necesites. ¡Buen día!',
          'Vuelve cuando desees más información sobre maquinaria Massey Ferguson.'
        ],
        'modelos': {
          'respuesta': 'Estos son algunos de los modelos más populares de Massey Ferguson:',
          'opciones': [
            'Tractores MF 4700: Versátiles, robustos, de 70-100 HP',
            'Tractores MF 5700 y 6700: Para trabajos medianos y pesados (100-130 HP)',
            'Tractores MF 7700 S y MF 8700 S: Alto rendimiento agrícola (140-370 HP)',
            'Cosechadoras MF IDEAL: Tecnología avanzada para grandes extensiones',
            'Cosechadoras MF Activa: Perfectas para medianos productores',
            'Implements Massey Ferguson: Arados, sembradoras, rotoempacadoras y más'
          ]
        },
        'precios': {
          'respuesta': 'Los precios de los equipos Massey Ferguson varían según el modelo y configuración:',
          'opciones': [
            'Contactanos para mas información:<a class="bg-red-500 p-2 rounded-lg text-white m-3 text-xs hover:bg-red-600" href="/contacto">Contacto</a>',
          ]
        },
        'financiacion': {
          'respuesta': 'Massey Ferguson ofrece planes de financiación flexibles:',
          'opciones': [
            'Créditos agrícolas con tasas preferenciales',
            'Leasing con opción a compra',
            'Planes especiales por temporada y promociones',
            'Subsidios disponibles para agricultores registrados en programas gubernamentales',
            'Contactanos para mas información:<a class="bg-red-500 p-2 rounded-lg text-white m-3 text-xs hover:bg-red-600" href="/contacto">Contacto</a>',
          ]
        },
        'mantenimiento': {
          'respuesta': 'Sigue estas recomendaciones para cuidar tu equipo Massey Ferguson:',
          'opciones': [
            'Revisión de aceite cada 250 horas o según manual del modelo',
            'Calibración de implementos cada campaña',
            'Limpieza de filtros de aire, combustible e hidráulicos periódicamente',
            'Servicio completo antes y después de cada temporada agrícola',
            
          ]
        },
        'garantia': 'Todos los equipos Massey Ferguson cuentan con garantía estándar de 2 años o hasta 2.000 horas. Se puede extender a 5 años con paquetes de mantenimiento extendido.',
        'servicio_tecnico': 'Disponemos de red oficial de servicio técnico Massey Ferguson en todo el país, con técnicos certificados y asistencia en campo.',
        'repuestos': 'Ofrecemos repuestos originales Massey Ferguson y entregas rápidas de piezas críticas. Disponibles en centros de distribución y tiendas asociadas.',
        'rutas': {
          'respuesta': 'Puedes navegar por nuestras secciones principales:',
          'opciones': [
           'Contactanos para mas información:<a class="bg-red-500 p-2 rounded-lg text-white m-3 text-xs hover:bg-red-600" href="/contacto">Contacto</a>',
          ]
        },
        'contacto': {
          'respuesta': 'Estamos aquí para ayudarte. Puedes contactarnos a través de:',
          'opciones': [
            'Teléfono: +(444) 254 9108',
            'Email: info@mavepo.com',
            'WhatsApp: 444 254 9108',
            'Contactanos para mas información:<a class="bg-red-500 p-2 rounded-lg text-white m-3 text-xs hover:bg-red-600" href="/contacto">Contacto</a>',
            ]
        },
        'creador': {
          'respuesta': 'Fui creado por Ricardo Escobar | NexSite 2025',
          
            'opciones': [
                'Visitanos:<a class="bg-red-500 p-2 rounded-lg text-white m-3 text-xs hover:bg-red-600" href="https://nexsite.com.mx/">NexSite</a>',
            ]
        }
      };
      
      // Patrones de clasificación de preguntas
      const patterns = {
        'saludo': /^(hola|buenos días|buenas tardes|buenas noches|saludos|buen dia|buenos dias)/i,
        'despedida': /^(adiós|hasta luego|chao|bye|nos vemos|gracias|adios)/i,
        'modelos': /(modelos|tipos|clases|catálogo|gama|cosechadoras|implementos|series|tractores|tractor|catalogo)/i,
        'precios': /(precio|cuánto cuesta|valor|cuánto vale|costo|tarifa|cuanto cuesta|cuanto vale)/i,
        'financiacion': /(financiación|financiar|pagar a plazos|leasing|crédito|ayudas|subsidios|credito|financiacion)/i,
        'mantenimiento': /(mantenimiento|servicio|cuidado|revisar|conservar|lubricación|inspección|lubricacion|inspeccion)/i,
        'garantia': /(garantia|garantías|avería|fallo|reparación|cobertura|garantias|averiareparacion)/i,
        'servicio_tecnico': /(servicio técnico|reparación|avería|técnicos|soporte|asistencia|servicio tecnico|reparacion|averia)/i,
        'repuestos': /(repuestos|piezas|recambios|componentes|partes|suministros)/i,
        'contacto': /(contacto|atención al cliente|ayuda|soporte|asistencia|teléfono|email|whatsapp|telefono|whats)/i,
        'creador': /(creador|desarrollador|programador|diseñador|autor|hecho por|creado)/i,

      };
      
      
  
    // Función para alternar el estado del chatbot (minimizado/expandido)
    chatbotToggle.addEventListener('click', () => {
      // Cambiar entre las clases para minimizado/maximizado con Tailwind
      const isMinimized = chatbotContainer.classList.contains('h-14');
      
      if (!isMinimized) {
        // Minimizar
        chatbotContainer.classList.remove('h-[450px]', 'w-80', 'md:w-96');
        chatbotContainer.classList.add('h-14', 'w-28', 'rounded-full');
        document.getElementById('chatbot-body').classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        // Maximizar
        chatbotContainer.classList.remove('h-14', 'w-14', 'rounded-full');
        chatbotContainer.classList.add('h-[450px]', 'w-80', 'md:w-96');
        document.getElementById('chatbot-body').classList.remove('hidden');
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        chatInput.focus();
      }
    });
  
    // Manejo del envío de mensajes
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const message = chatInput.value.trim();
      if (!message) return;
      
      // Añadir mensaje del usuario al chat
      addMessage('user', message);
      chatInput.value = '';
      
      // Mostrar indicador de escritura
      showTypingIndicator();
      
      // Procesar respuesta (con un pequeño retraso para simular "pensamiento")
      setTimeout(() => {
        // Ocultar indicador de escritura
        hideTypingIndicator();
        
        const response = generateResponse(message);
        addMessage('bot', response);
        
        // Desplazamiento automático hacia abajo
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    });
  
    // Función para mostrar el indicador de escritura
    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.id = 'typing-indicator';
      typingDiv.className = 'flex mb-4';
      
      typingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full flex justify-center items-center mr-2">🚜</div>
        <div class="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
          </div>
        </div>
      `;
      
      chatMessages.appendChild(typingDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Función para ocultar el indicador de escritura
    function hideTypingIndicator() {
      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }
  
    // Función para añadir un mensaje al chat
    function addMessage(type, message) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `flex mb-4 ${type === 'user' ? 'flex-row-reverse' : ''}`;
      
      const avatarDiv = document.createElement('div');
      avatarDiv.className = `w-8 h-8 rounded-full flex justify-center items-center ${type === 'user' ? 'ml-2' : 'mr-2'}`;
      avatarDiv.textContent = type === 'bot' ? '🚜' : '👤';
      
      const contentDiv = document.createElement('div');
      contentDiv.className = `px-3 py-2 rounded-lg max-w-[70%] break-words ${
        type === 'user' 
          ? 'bg-blue-100 text-gray-800 rounded-tr-none' 
          : 'bg-gray-100 text-gray-800 rounded-tl-none'
      }`;
      
      // Manejar saltos de línea en el mensaje
      const formattedMessage = message.replace(/\n/g, '<br>');
      contentDiv.innerHTML = formattedMessage;
      
      messageDiv.appendChild(avatarDiv);
      messageDiv.appendChild(contentDiv);
      
      // Añadir una clase para animación de entrada
      messageDiv.classList.add('animate-fade-in');
      
      chatMessages.appendChild(messageDiv);
      
      // Desplazamiento automático
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Función para generar una respuesta basada en el mensaje del usuario
    function generateResponse(message) {
      // Convertir a minúsculas para facilitar la comparación
      const lowerMessage = message.toLowerCase();
      
      // Verificar si coincide con algún patrón conocido
      for (const [category, pattern] of Object.entries(patterns)) {
        if (pattern.test(lowerMessage)) {
          const knowledge = tractorKnowledge[category];
          
          // Si la respuesta es un objeto con opciones, formateamos una respuesta completa
          if (typeof knowledge === 'object' && knowledge.opciones) {
            return `${knowledge.respuesta}\n- ${knowledge.opciones.join('\n- ')}`;
          }
          
          // Si es un array, elegimos una respuesta aleatoria
          if (Array.isArray(knowledge)) {
            return knowledge[Math.floor(Math.random() * knowledge.length)];
          }
          
          // Si es un string simple, lo devolvemos directamente
          return knowledge;
        }
      }
      
      // Respuestas para consultas específicas sobre tractores
      if (lowerMessage.includes('xa-200') || (lowerMessage.includes('xa') && lowerMessage.includes('200'))) {
        return 'El modelo XA-200 es nuestro tractor más potente con 180HP, ideal para grandes extensiones y trabajos exigentes. Incluye GPS integrado y cabina climatizada de última generación. Su precio es de 115.000€.';
      }
      
      if (lowerMessage.includes('rt-150') || (lowerMessage.includes('rt') && lowerMessage.includes('150'))) {
        return 'El RT-150 es un tractor versátil de 95HP con excelente relación calidad-precio. Perfecto para tareas agrícolas diversas en extensiones medianas. Su precio es de 68.500€.';
      }
      
      if (lowerMessage.includes('lc-50') || (lowerMessage.includes('lc') && lowerMessage.includes('50'))) {
        return 'El LC-50 es nuestro tractor compacto de 35HP, ideal para jardinería profesional, huertas y pequeñas explotaciones. Su maniobrabilidad es excepcional. Su precio es de 32.900€.';
      }
      
      // Respuesta predeterminada si no coincide con ningún patrón conocido
      return 'Lo siento, no tengo información específica sobre esa consulta. ¿Puedo ayudarte con información sobre nuestros modelos, precios, financiación o servicio técnico?';
    }
  
    // Iniciar el chatbot en estado minimizado en dispositivos móviles
    if (window.innerWidth <= 768) {
      // Versión para móviles (minimizado por defecto)
      chatbotContainer.classList.remove('h-[450px]', 'w-80', 'md:w-96');
      chatbotContainer.classList.add('h-14', 'w-28', 'rounded-full');
      document.getElementById('chatbot-body').classList.add('hidden');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
    
    // Añadir estilos de animación personalizados para la aparición de mensajes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.3s ease forwards;
      }
    `;
    document.head.appendChild(style);
  });
  
  // Función para generar una respuesta basada en el mensaje del usuario
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
  
    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(lowerMessage)) {
        if (category === 'modelos' || category === 'precios' || category === 'financiacion' || category === 'mantenimiento' || category === 'rutas') {
          const info = tractorKnowledge[category];
          const formattedOptions = info.opciones.map(item => `• ${item}`).join('<br>');
          let fullMessage = `<strong>${info.respuesta}</strong><br>${formattedOptions}`;
  
          // Agregar botón de redirección si la categoría es "precios"
          if (category === 'precios') {
            fullMessage += `<br><br><a href="/productos" class="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Ver todos los productos</a>`;
          }
  
          return fullMessage;
        }
  
        // Si es una respuesta de texto plano
        if (typeof tractorKnowledge[category] === 'string') {
          return tractorKnowledge[category];
        }
  
        // Si es saludo o despedida con múltiples opciones
        if (Array.isArray(tractorKnowledge[category])) {
          const opciones = tractorKnowledge[category];
          return opciones[Math.floor(Math.random() * opciones.length)];
        }
      }
    }
  
    // Respuesta por defecto si no se reconoce la pregunta
    return 'Lo siento, no entendí eso. ¿Puedes reformular o ser más específico sobre lo que buscas?';
  }
  