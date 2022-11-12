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

        internal void Update(Cliente novoCliente)
        {
            Nome = novoCliente.Nome;
            Email = novoCliente.Email;
            Telefone = novoCliente.Telefone;
            Estado = novoCliente.Estado;
            Cidade = novoCliente.Cidade;
            Bairro = novoCliente.Bairro;
            Nascimento = novoCliente.Nascimento;
            Renda = novoCliente.Renda;
            FGTS = novoCliente.FGTS;
            Genero = novoCliente.Genero;
            EstadoCivil = novoCliente.EstadoCivil;
            Filhos = novoCliente.Filhos;
        }
    }
}
