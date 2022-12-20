<?php

/**
 * Class Nucleoweb_Application
 *
 * Classe principal de configuração dos plugins e temas.
 *
 * @since 1.2.0
 */
class RTW_Application extends RTW_Setup {

    protected function setup() {
        $this->init_setups();
    }

    private function init_setups() {
	    RWT_Scripts::get_instance()->init();
	    RWT_Blocks::get_instance()->init();
	    RWT_Supports::get_instance()->init();
    }
}