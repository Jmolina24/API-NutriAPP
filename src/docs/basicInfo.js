import config from '../config';
module.exports = {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "API Servicies Web - Nutricion APP",
    description: "API Desarrolladas en Node Js",
    version: `${config.version}`,
    contact: {
      name: "Desarrollado por UiiLab", // your name
      url: "https://www.instagram.com/uiilab/", // your website
    },
  },

  paths: {
    "/api/v1/login/sign": {
      post: {
        tags: ["Login"],
        summary: "Permite generar la autenticación para poder acceder y consumir los servicios de NutricionAPP. (Síncrona)",
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginDto"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          412: {
            description: "Errores de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorPreconditionFailed"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/login/recoverkey": {
      post: {
        tags: ["Login"],
        summary: "Permite recuperar la contraseña para el ingreso  NutricionAPP. (Síncrona)",
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRecuperateKeyDto"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRecuperateKeyRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          412: {
            description: "Errores de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorPreconditionFailed"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/login/register": {
      post: {
        tags: ["Login"],
        summary: "Permite crear un cliente en NutricionAPP. (Síncrona)",
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRegisterDto"
              },
            }
          }
        },
        responses: {
          201: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRegisterRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          412: {
            description: "Errores de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorPreconditionFailed"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/login/changePassword": {
      post: {
        tags: ["Login"],
        summary: "Permite cambiar la crendencial del usuario en NutricionAPP. (Síncrona)",
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginChangePasswordDto"
              },
            }
          }
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginChangePassowedRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          412: {
            description: "Errores de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorPreconditionFailed"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },


    "/api/v1/profile/user/{id}": {
      get: {
        tags: ["Profile"],
        summary: "Permite listar la información del usuario  (Síncrona)",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID Usuario",
            schema: {
              type: "string"
            },
            required: true
          },
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar información del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProfileUserRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/tracing/{id}": {
      get: {
        tags: ["Profile"],
        summary: "Permite listar el seguimiento del usuario  (Síncrona)",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID Usuario",
            schema: {
              type: "string"
            },
            required: true
          },
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar seguimiento del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProfileUserTracingRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/payment-history/{id}": {
      get: {
        tags: ["Profile"],
        summary: "Permite listar el historial de pago del usuario  (Síncrona)",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID Usuario",
            schema: {
              type: "string"
            },
            required: true
          },
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar historial de pago",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProfileUserPaymentHistoryRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/imc-history/{id}": {
      get: {
        tags: ["Profile"],
        summary: "Permite listar el historial de IMC del usuario  (Síncrona)",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID Usuario",
            schema: {
              type: "string"
            },
            required: true
          },
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar historial de IMC",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProfileUserSeguimientoIMCRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/tracing-slopes": {
      get: {
        tags: ["Profile"],
        summary: "Permite listar el seguimientos de los usuarios pendientes  (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Lista de usuarios en estado pendiente de seguimiento",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProfileUserTracingSlopesRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/tracing": {
      post: {
        tags: ["Profile"],
        summary: "Permite crear un seguimientos al usuario  (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginTracingDto"
              },
            }
          }
        },
        responses: {
          201: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRegisterRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          412: {
            description: "Errores de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorPreconditionFailed"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/profile/tracing-response": {
      post: {
        tags: ["Profile"],
        summary: "Permite responder un seguimientos al usuario  (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginTracingResponseDto"
              },
            }
          }
        },
        responses: {
          201: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRegisterRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },

    "/api/v1/profile/user-paymet": {
      post: {
        tags: ["Profile"],
        summary: "Permite marcar al cliente para el pago (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserPaymetResponseDto"
              },
            }
          }
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRegisterRto"
                }
              }
            }
          },
          400: {
            description: "Errores por la BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginError"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },



    "/api/v1/upload/files": {
      post: {
        tags: ["Upload"],
        summary: "Permite cargar los soportes del registros a NutriAPP  (Síncrona)",
        requestBody: {
          description: "A zip file containing files that will be unzipped",
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/UpdadaFileResponseDto"
              },
              required: true
            }
          },
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateFileRto"
                }
              }
            }
          },
          400: {
            description: "Errores Cargando Los Adjuntos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateError"
                }
              }
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },

    "/api/v1/payments/createOrder": {
      post: {
        tags: ["Payments"],
        summary: "Permite generar el pago de la factura de NutricionAPP. (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        requestBody: {
          description: "Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PaymentsCreateDto"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Respuesta por BD",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaymentsCreateRto"
                }
              }
            }
          },
          // 412: {
          //   description: "Errores de validacion",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/ErrorPreconditionFailed"
          //       }
          //     }
          //   }
          // },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/option/plan/{estado}": {
      get: {
        tags: ["Option"],
        summary: "Permite listar los planes activos  (Síncrona)",
        parameters: [
          {
            name: "estado",
            in: "path",
            description: "Estado Planes (A = Activos - T = Todos)",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar todos los planes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/OptionPlanesRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequest"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/option/tipoDocumentos": {
      get: {
        tags: ["Option"],
        summary: "Permite listar los tipos Documentos (Síncrona)",
        responses: {
          200: {
            description: "Listar todos los tipos Documentos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/OptionTipoDocumentoRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequestOption"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/option/generos": {
      get: {
        tags: ["Option"],
        summary: "Permite listar los tipos de generos (Síncrona)",
        responses: {
          200: {
            description: "Listar todos los tipos de generos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/OptionTipoDocumentoRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequestOption"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/option/listCustomer": {
      get: {
        tags: ["Option"],
        summary: "Permite listar todos los clientes de Nutriapp (Síncrona)",
        parameters: [
          {
            name: "tsec",
            in: "header",
            description: "Authentication token",
            schema: {
              type: "string"
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: "Listar todos los clientes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/OptionListClientesRto"
                  }
                }
              },
            }
          },
          500: {
            description: "Error servidor bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorBadRequestOption"
                }
              }
            }
          }
        }
      }
    },


  }
};







