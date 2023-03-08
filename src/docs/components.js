module.exports = {
  components: {
    schemas: {
      LoginDto: {
        type: "object",
        properties: {
          usuario: {
            type: "string",
            description: "Se debe enviar el usuario registrado, cual tiene los privilegios necesarios para aceceder y generar el  token que permiten consumir los servicios.",
            nullable: false
          },
          password: {
            type: "string",
            description: "Clave del usuario para solicitar el token. Requerido",
            nullable: false
          }
        }
      },

      PaymentsCreateDto: {
        type: "object",
        properties: {
          titulo: {
            type: "string",
            nullable: false
          },
          cantidad: {
            type: "number",
            nullable: false
          },
          precio_unitario: {
            type: "number",
            nullable: false
          },
          id_web: {
            type: "string",
            nullable: false
          }
        }
      },


      LoginRecuperateKeyDto: {
        type: "object",
        properties: {
          correo: {
            type: "string",
            description: "Se debe enviar el usuario registrado, cual tiene los privilegios necesarios para aceceder y generar el  token que permiten consumir los servicios.",
            nullable: false
          }
        }
      },
      LoginRegisterDto: {
        type: "object",
        properties: {
          primer_nombre: {
            type: "string",
            description: "Primer nombre cliente",
            nullable: false
          },
          segundo_nombre: {
            type: "string",
            description: "Segundo nombre cliente",
            nullable: false
          },
          primer_apellido: {
            type: "string",
            description: "Primer apellido cliente",
            nullable: false
          },
          segundo_apellido: {
            type: "string",
            description: "Segundo apellido cliente",
            nullable: false
          },
          fecha_nacimiento: {
            type: "string",
            format: "date-time",
            description: "Fecha nacimiento cliente",
            nullable: false
          },
          tipo_documento: {
            type: "string",
            description: "Tipo documento cliente",
            nullable: false
          },
          num_documento: {
            type: "string",
            description: "Numero documento cliente",
            nullable: false
          },
          email: {
            type: "string",
            description: "Correo cliente",
            nullable: false
          },
          telefono: {
            type: "integer",
            description: "Telefono cliente",
            nullable: false
          },
          genero: {
            type: "string",
            description: "Genero cliente",
            nullable: false
          },
          password: {
            type: "string",
            description: "Contraseña cliente",
            nullable: false
          },
          plan_id: {
            type: "integer",
            description: "Plan a escoger cliente",
            nullable: false
          },
          peso: {
            type: "integer",
            description: "Clave del usuario para solicitar el token. Requerido",
            nullable: false
          },
          estatura: {
            type: "integer",
            description: "Estatura cliente",
            nullable: false
          },
          talla_cintura: {
            type: "integer",
            description: "Talla cintura cliente",
            nullable: false
          },
          talla_cadera: {
            type: "integer",
            description: "Talla Cadera cliente",
            nullable: false
          },
          foto_frontal: {
            type: "string",
            description: "Foto frontal cliente",
            nullable: false
          },
          foto_lateral: {
            type: "string",
            description: "Foto lateral cliente",
            nullable: false
          },
          foto_espalda: {
            type: "string",
            description: "Foto espalda cliente",
            nullable: false
          }
        }
      },
      LoginChangePasswordDto: {
        type: "object",
        properties: {
          user_id: {
            type: "integer",
            nullable: false
          },
          clave_nueva: {
            type: "string",
            nullable: false
          }
        }
      },

      LoginTracingDto: {
        properties: {
          id: {
            type: "string",
            nullable: false
          },
          peso: {
            type: "string",
            nullable: false
          },
          estatura: {
            type: "string",
            nullable: false
          },
          talla_cintura: {
            type: "string",
            nullable: false
          },
          talla_cadera: {
            type: "string",
            nullable: false
          },
          foto_frontal: {
            type: "string",
            nullable: false
          },
          foto_lateral: {
            type: "string",
            nullable: false
          },
          foto_espalda: {
            type: "string",
            nullable: false
          },
        }
      },

      LoginTracingResponseDto: {
        properties: {
          id_seguimiento: {
            type: "string",
            nullable: false
          },
          comentarios: {
            type: "string",
            nullable: false
          },
          plan_adjunto: {
            type: "string",
            nullable: false
          }
        }
      },

      UpdadaFileResponseDto: {
        type: "object",
        properties: {
          file: {
            type: "files",
            format: "binary",
          }
        }
      },
      LoginRto: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          temporal: {
            type: "boolean",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          },
          user_id: {
            type: "integer",
            nullable: false
          },
          nombre: {
            type: "string",
            nullable: false
          },
          token: {
            type: "string",
            nullable: false
          },
          rol: {
            type: "integer",
            nullable: false
          },
          nombre_perfil: {
            type: "string",
            nullable: false
          }
        }
      },

      PaymentsCreateRto: {
        type: "object",
        properties: {
          id: {
            type: "string",
            nullable: false
          }
        }
      },


      LoginRegisterRto: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          }
        }
      },

      UpdateFileRto: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          },
          rutas: {
            type: "object",
            properties: {
              fieldname: {
                type: "string",
              },
              originalname: {
                type: "string",
              },
              encoding: {
                type: "string",
              },
              mimetype: {
                type: "string",
              },
              destination: {
                type: "string",
              },
              filename: {
                type: "string",
              },
              path: {
                type: "string",
              },
              size: {
                type: "string",
              }
            }
          }
        },
      },


      LoginChangePassowedRto: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          }
        }
      },



      OptionPlanesRto: {
        properties: {
          plan_id: {
            type: "integer",
            nullable: false
          },
          plan_duracion: {
            type: "integer",
            nullable: false
          },
          plan_estado: {
            type: "string",
            nullable: false
          },
          plan_caracteristicas: {
            type: "string",
            nullable: false
          },
          plan_precio: {
            type: "integer",
            nullable: false
          },
          plan_nombre: {
            type: "string",
            nullable: false
          }
        }
      },
      LoginRecuperateKeyRto: {
        properties: {
          password: {
            type: "string",
            nullable: false
          }
        }
      },
      ProfileUserRto: {
        properties: {
          user_id: {
            type: "integer",
            nullable: false
          },
          user_primer_nombre: {
            type: "string",
            nullable: false
          },
          user_segundo_nombre: {
            type: "string",
            nullable: false
          },
          user_primer_apellido: {
            type: "string",
            nullable: false
          },
          user_segundo_apellido: {
            type: "string",
            nullable: false
          },
          user_fecha_nacimiento: {
            type: "string",
            format: "date-time",
            nullable: false
          },
          user_fecha_registro: {
            type: "string",
            format: "date-time",
            nullable: false
          },
          user_email: {
            type: "string",
            nullable: false
          },
          user_telefono: {
            type: "string",
            nullable: false
          },
          genero: {
            type: "string",
            nullable: false
          },
          estado: {
            type: "string",
            nullable: false
          },
          plan_seleccionado: {
            type: "string",
            nullable: false
          },
        }
      },
      ProfileUserTracingRto: {
        properties: {
          numero: {
            type: "integer",
            nullable: false
          },
          peso: {
            type: "string",
            nullable: false
          },
          estatura: {
            type: "string",
            nullable: false
          },
          revisado: {
            type: "string",
            nullable: false
          },
          fecha_registro: {
            type: "string",
            format: "date-time",
            nullable: false
          },
          id: {
            type: "integer",
            nullable: false
          }
        }
      },
      ProfileUserPaymentHistoryRto: {
        properties: {
          Num: {
            type: "string",
            nullable: false
          },
          fecha_pago: {
            type: "string",
            format: "date-time",
            nullable: false
          },
          nombre_plan: {
            type: "string",
            nullable: false
          },
          estado_pago: {
            type: "string",
            nullable: false
          },
          valor_pago: {
            type: "integer",
            nullable: false
          }
        }
      },
      ProfileUserTracingSlopesRto: {
        properties: {
          id_seguimiento: {
            type: "integer",
            nullable: false
          },
          user_id: {
            type: "integer",
            nullable: false
          },
          fecha_registro: {
            type: "string",
            format: "date-time",
            nullable: false
          },
          nombre_usuario: {
            type: "string",
            nullable: false
          },
          peso: {
            type: "string",
            nullable: false
          },
          estatura: {
            type: "string",
            nullable: false
          },
          segm_talla_cintura: {
            type: "integer",
            nullable: false
          },
          segm_foto_frontal: {
            type: "string",
            nullable: false
          },
          segm_foto_lateral: {
            type: "string",
            nullable: false
          },
          segm_foto_espalda: {
            type: "string",
            nullable: false
          },
          revisado: {
            type: "string",
            nullable: false
          },
        }
      },

      ProfileUserSeguimientoIMCRto: {
        properties: {
          numero: {
            type: "integer",
            nullable: false
          },
          imc: {
            type: "integer",
            nullable: false
          },
          procentaje_grasa: {
            type: "integer",
            nullable: false
          },
          fecha_seguimiento: {
            type: "string",
            format: "date-time",
            nullable: false
          }
        }
      },

      LoginError: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          }
        }
      },
      UpdateError: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: false
          },
          mensaje: {
            type: "string",
            nullable: false
          }
        }
      },

      ErrorBadRequest: {
        type: "object",
        properties: {
          error: {
            type: "string",
            nullable: true
          },
        }
      },
      ErrorPreconditionFailed: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            nullable: true
          },
          param: {
            type: "string",
            nullable: true
          },
          location: {
            type: "string",
            nullable: true
          },
        }
      },


      OptionTipoDocumentoRto: {
        properties: {
          codigo: {
            type: "string",
            nullable: false
          },
          nombre: {
            type: "string",
            nullable: false
          }
        }
      },

      ErrorBadRequestOption: {
        type: "object",
        properties: {
          codigo: {
            type: "integer",
            nullable: true
          },
          mensaje: {
            type: "string",
            nullable: true
          }
        }
      },


    }
  }
};