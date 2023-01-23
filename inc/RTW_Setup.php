<?php

/**
 * Class RTW_Setup
 *
 * Cria um singleton para cada classe de configuração do sistema
 *
 * hooks da classe:
 * * on_create  - Executado no momento que a classe e criada no singleton.
 * * setup      - Chamado no momento que a configuração da classe for iniciada.
 *
 * @since 1.2.0
 */
abstract class RTW_Setup {

    private static $instances = [];

    // Registro do uso do método init
    private $initialized = false;

    // Registra um nome para o setup
    // Se não for informado o nome usado será o da classe final
    protected $setup_name;

    // Define uma action para rodar o setup
    // Se não for informado o setup será executado no momento que o init for acionado
    protected $run_setup_in = null;
    protected $run_setup_priority = 10;

    /**
     * Não é permitido instanciar diretamente, use o método get_instance.
     */
    private function __construct() {
        $this->on_create();

        $this->setup_name = $this->setup_name ?? static::class;
    }

    /**
     * Controla a criação das instâncias.
     *
     * Cria ou retorna uma instância existente para cada classe final.
     *
     * @return mixed|static
     */
    public static function get_instance() {
        $class_name = static::class;

        if ( ! isset( self::$instances[ $class_name ] ) ) {
            self::$instances[ $class_name ] = new static();
        }

        return self::$instances[ $class_name ];
    }

    /**
     * Informa se o método de configuração já foi inicializado.
     *
     * @return bool
     */
    public function initialized(): bool {
        return $this->initialized;
    }

    /**
     * Inicia a configuração chamando o método "setup" que pode ser chamado uma única vez em cada classe
     */
    public function init() {
        // Previne que o método de configuração seja chamado 2 vezes
        if ( $this->initialized ) {
            return;
        }

        $this->initialized = true;

        if ( $this->run_setup_in == null ) {
            // Executa o setup exatamente no momento que o init e acionado
            $this->setup();
        } else {
            // Executa o setup em uma ação
            add_action( $this->run_setup_in, function () {
                $this->setup();
            }, $this->run_setup_priority );
        }
    }

    /**
     * Chamado no momento que a classe é instânciada.
     */
    protected function on_create() {
    }

    /**
     * Responsável por trabalhar as configurações setadas do momento da criação ate a sua chamada.
     */
    abstract protected function setup();
}
