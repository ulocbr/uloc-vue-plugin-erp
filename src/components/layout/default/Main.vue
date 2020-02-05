<script>
import {USpinnerUloc} from 'uloc-vue'

export default {
  name: 'ErpHeader',
  components: {USpinnerUloc},
  data () {
    return {
      isLoading: true
    }
  },
  computed: {},
  created () {
    window.setTimeout(() => {
      this.isLoading = false
    }, 3000)
  },
  methods: {},
  meta: {
    title: 'Software - Principal',
    name: 'Dashboard'
  }
}
</script>

<template>
  <u-page ref="page" class="flex column">
    <div class="erp-header">
      <div class="erp-menu">
        <ul class="erp-menu-items">
          <li><a>Principal</a></li>
          <li><a>Bens</a></li>
          <li><a>Leilões</a></li>
          <li><a>Comitentes</a></li>
          <li><a>Arrematantes</a></li>
          <li class="selected"><a>Administrar site</a></li>
          <li><a>Financeiro</a></li>
          <li><a>RH</a></li>
          <li><a>Auditoria</a></li>
          <li><a>Configurações</a></li>
        </ul>
        <div class="erp-menu-alerts">
          <i>3</i>
          <span>Avisos importantes</span>
        </div>
        <div class="erp-account-info">
          <div class="erp-account-img"><a><img src="../../../assets/photo.jpg"></a></div>
          <div class="erp-account-logout"><a>Sair</a></div>
        </div>

        <div class="erp-module-toggle "><a><img src="../../../assets/seta.png"></a></div>
        <!-- .toggled if .erp-module-menu hide -->
      </div>
      <div class="erp-module-menu ">
        <!-- .toggled to hide -->
        <div class="erp-module-menu-component">
          <div class="lbl">Minha conta</div>
          <ul class="erp-module-menu-items">
            <li><a><i class="i-menu-m perfil"></i> <span>Meu perfil</span></a></li>
            <li><a><i class="i-menu-m config"></i> <span>Configurações</span></a></li>
          </ul>
        </div>
        <div class="erp-module-menu-component">
          <div class="lbl">Intranet</div>
          <ul class="erp-module-menu-items">
            <li><a><i class="i-menu-m network"></i> <span>Social Network</span></a></li>
            <li><a><i class="i-menu-m mensagens"></i> <span>Mensagens</span></a></li>
            <li><a><i class="i-menu-m knowledge"></i> <span>Base de conhecimento</span></a></li>
          </ul>
        </div>
        <div class="erp-module-menu-component">
          <div class="lbl">Colaborativo</div>
          <ul class="erp-module-menu-items">
            <li><a><i class="i-menu-m tasks"></i> <span>Tarefas</span></a></li>
            <li><a><i class="i-menu-m metas"></i> <span>Minhas metas</span></a></li>
            <li><a><i class="i-menu-m files"></i> <span>Arquivos</span></a></li>
          </ul>
        </div>

        <div class="erp-module-menu-component erp-menu-right">
          <ul class="erp-module-menu-items">
            <li><a><i class="i-menu-m home"></i> <span>Principal</span></a></li>
            <li><a><i class="i-menu-m help"></i> <span>Ajuda</span></a></li>
          </ul>
        </div>
      </div>
    </div>
    <transition v-if="!isLoading" name="slide" appear>
      <div class="transition-generic">
        <div>
          <h1>Hello</h1>
          <p>
            Hi Uloc Dev :)
          </p>
        </div>
      </div>
    </transition>
    <div class="task-container-loading" v-else>
      <u-spinner-uloc />
      Aguarde
    </div>
  </u-page>
</template>
