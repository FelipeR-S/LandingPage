using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LandingPage.Models
{
    [DataContract]
    public abstract class BaseModel
    {
        [DataMember]
        public int Id { get; set; }
    }

    public class Cliente : BaseModel
    {
        public Cliente(string nome, string email, string telefone, string estado, string cidade, string? bairro, DateTime? nascimento, string? renda, bool? fGTS, string? genero, string? estadoCivil, string? filhos)
        {
            Nome = nome;
            Email = email;
            Telefone = telefone;
            Estado = estado;
            Cidade = cidade;
            Bairro = bairro;
            Nascimento = nascimento;
            Renda = renda;
            FGTS = fGTS;
            Genero = genero;
            EstadoCivil = estadoCivil;
            Filhos = filhos;
        }

        [MinLength(5, ErrorMessage = "Nome deve ter no mínimo 5 caracteres")]
        [MaxLength(50, ErrorMessage = "Nome deve ter no máximo 50 caracteres")]
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; } = string.Empty;
        [Required(ErrorMessage = "E-mail é obrigatório")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Telefone é obrigatório")]
        [Key]
        public string Telefone { get; set; } = string.Empty;
        [Required(ErrorMessage = "Um estado deve ser selecionado")]
        public string Estado { get; set; } = string.Empty;
        [Required(ErrorMessage = "Uma cidade deve ser selecionada")]
        public string Cidade { get; set; } = string.Empty;
        public string? Bairro { get; set; }
        public DateTime? Nascimento { get; set; }
        public string? Renda { get; set; }
        public bool? FGTS { get; set; }
        public string? Genero { get; set; }
        public string? EstadoCivil { get; set; }
        public string? Filhos { get; set; }
    }
}
