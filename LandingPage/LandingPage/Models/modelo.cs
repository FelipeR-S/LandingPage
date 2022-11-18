using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace LandingPage.Models
{
    /// <summary>
    /// Base para construções de outras classes do modelo
    /// </summary>
    [DataContract]
    public abstract class BaseModel
    {
        [DataMember]
        public int Id { get; set; }
    }

    /// <summary>
    /// Classe responsável por gerir informações do cliente cadastrado
    /// </summary>
    public class Cliente : BaseModel
    {
        public Cliente()
        {
        }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        [Key]
        public string Telefone { get; set; } = string.Empty;
        public string? Estado { get; set; }
        public string? Cidade { get; set; }
        public string? Bairro { get; set; }
        public DateTime? Nascimento { get; set; }
        public string? Renda { get; set; }
        public bool? FGTS { get; set; }
        public string? Genero { get; set; }
        public string? EstadoCivil { get; set; }
        public string? Filhos { get; set; }
        public DateTime DataCadastro { get; private set; } = DateTime.Now;

    }

    /// <summary>
    /// Classe responsável por gerir informações de email de NewsLetter
    /// </summary>
    public class NewsLetter : BaseModel
    {
        public NewsLetter()
        {
        }
        [Key]
        public string Email { get; set; } = string.Empty;
    }
}
