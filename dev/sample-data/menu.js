export default [
  {
    menuName: 'Principal',
    components: [
      {
        component: 'Minha conta',
        features: [
          {name: 'Meu perfil', icon: 'perfil'},
          {name: 'Configurações', icon: 'config'}
        ]
      },
      {
        component: 'Intranet',
        features: [
          {name: 'Social Network', icon: 'network'},
          {name: 'Mensagens', icon: 'mensagens', tip: '3'},
          {name: 'Base de conhecimento', icon: 'knowledge'}
        ]
      },
      {
        component: 'Colaborativo',
        features: [
          {name: 'Tarefas', icon: 'tasks'},
          {name: 'Minhas metas', icon: 'metas'},
          {name: 'Arquivos', icon: 'files'}
        ]
      },
      {
        component: 'Ajuda',
        right: true,
        hideLabel: true,
        features: [
          {name: 'Principal', icon: 'home'},
          {name: 'Ajuda', icon: 'help'}
        ]
      }
    ]
  },
  {
    menuName: 'Bens',
    components: [
      {
        component: 'Processo de Remoção',
        features: [
          {name: 'Remocão', icon: 'truck'},
          {name: 'Rastreamento', icon: 'track'}
        ]
      },
      {
        component: 'Administração de Bens',
        features: [
          {name: 'Administrar Bens', icon: 'mat'},
          {name: 'Pátios', icon: 'map-pointer'},
          {name: 'Cálculo de Estadas', icon: 'calc'}
        ]
      }
    ]
  },
  {
    menuName: 'Leilões',
    components: [
      {
        component: 'Administração de Leilão',
        features: [
          {name: 'Leilões', icon: 'auction'},
          {name: 'PDS', icon: 'terminal'},
          {name: 'Pagamento de Lotes', icon: 'thermal-print'},
          {name: 'Ponto de Atendimento', icon: 'contact'}
        ]
      }
    ]
  },
  {
    menuName: 'Comitentes',
    components: []
  },
  {
    menuName: 'Arrematantes',
    components: [
      {
        component: 'Administração de Arrematantes',
        features: [
          {name: 'Arrematantes', icon: 'user'},
          {name: 'Exportar base', icon: 'export'},
          {name: 'Campanhas de comunicação', icon: 'chat'},
          {name: 'Monitoramento', icon: 'monitor'},
          {name: 'Aprovação de cadastros', icon: 'list'}
        ]
      }
    ]
  },
  {
    menuName: 'Administrar Site',
    components: []
  },
  {
    menuName: 'Financeiro',
    components: []
  },
  {
    menuName: 'RH',
    components: []
  },
  {
    menuName: 'Auditoria',
    components: []
  },
  {
    menuName: 'Configurações',
    components: []
  }
]
