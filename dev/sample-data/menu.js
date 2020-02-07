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
          {name: 'Mensagens', icon: 'mensagens'},
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
        component: 'Processo de remoção',
        features: [
          {name: 'Remocão', icon: ''},
          {name: 'Rastreamento', icon: ''}
        ]
      },
      {
        component: 'Administração de Bens',
        features: [
          {name: 'Administrar Bens', icon: ''},
          {name: 'Pátios', icon: ''},
          {name: 'Cálculo de Estadas', icon: ''}
        ]
      }
    ]
  },
  {
    menuName: 'Leilões',
    components: []
  },
  {
    menuName: 'Comitentes',
    components: []
  },
  {
    menuName: 'Arrematantes',
    components: []
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
